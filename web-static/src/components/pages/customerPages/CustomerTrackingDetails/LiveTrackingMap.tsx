import { useEffect, useRef, useState, memo, useCallback } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";
import { useParams } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import axiosInstance from "../../../../api/axiosInstance";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface Coord {
  lng: number;
  lat: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const BUFFER_LIMIT         = 3;     // drain to latest if queue exceeds this
const ANIM_DURATION        = 800;   // ms per coordinate step
const WS_THROTTLE_MS       = 100;   // ignore WS messages faster than this
const DEVIATION_THRESHOLD  = 0.05;  // km (50 m) before route is re-fetched
const REROUTE_COOLDOWN_MS  = 15000; // minimum ms between route re-fetches
const WS_BASE_BACKOFF_MS   = 2000;  // initial reconnect wait
const WS_MAX_BACKOFF_MS    = 30000; // reconnect wait cap

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function calcBearing(a: Coord, b: Coord): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const dLng  = toRad(b.lng) - toRad(a.lng);
  const y     = Math.sin(dLng) * Math.cos(toRad(b.lat));
  const x     =
    Math.cos(toRad(a.lat)) * Math.sin(toRad(b.lat)) -
    Math.sin(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

function haversineKm(a: Coord, b: Coord): number {
  const R    = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h    =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

// Shortest-path lerp across the 0/360 boundary
function lerpBearing(from: number, to: number, t: number): number {
  const diff = ((to - from + 540) % 360) - 180;
  return from + diff * t;
}

// Cubic ease-in-out
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Returns the minimum distance in km between `rider` and any point on the
 * route polyline. Used to detect meaningful deviation.
 *
 * We check against every vertex rather than every segment — good enough for
 * the 50 m threshold and avoids segment-projection math.
 */
function minDistToRouteKm(rider: Coord, routeCoords: number[][]): number {
  let min = Infinity;
  for (const c of routeCoords) {
    const d = haversineKm(rider, { lng: c[0], lat: c[1] });
    if (d < min) min = d;
  }
  return min;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components — memo'd so parent state changes never remount the Map
// (each remount = one billable Mapbox map load).
// ─────────────────────────────────────────────────────────────────────────────
const RiderMarker = memo(function RiderMarker({ bearing }: { bearing: number }) {
  return (
    <div
      style={{
        transform:  `rotate(${bearing}deg)`,
        transition: "transform 0.25s ease-out",
        filter:     "drop-shadow(0 4px 14px rgba(234,88,12,0.65))",
        willChange: "transform",
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="#EA580C" fillOpacity="0.18" />
        <circle cx="20" cy="20" r="16" fill="#EA580C" />
        <path d="M20 9 L26.5 29 L20 24.5 L13.5 29 Z" fill="white" />
      </svg>
    </div>
  );
});

const DestinationMarker = memo(function DestinationMarker() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute h-16 w-16 rounded-full bg-blue-400/20 animate-ping" />
      <div className="absolute h-9  w-9  rounded-full bg-blue-500/25" />
      <div className="w-5 h-5 bg-blue-500 rounded-full border-[2.5px] border-white shadow-xl" />
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
function LiveTrackingMap() {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();

  const [riderCoord, setRiderCoord] = useState<Coord | null>(null);
  const [bearing,    setBearing]    = useState(0);
  const [etaMinutes, setEtaMinutes] = useState<number | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [connected,  setConnected]  = useState(false);
  const [routeGeo,   setRouteGeo]   = useState<any>(null);
  const [rerouting,  setRerouting]  = useState(false); // visual hint while re-fetching

  const mapRef              = useRef<any>(null);
  const hasFlownRef         = useRef(false);

  // Animation state in refs — never triggers re-renders
  const riderBufferRef      = useRef<Coord[]>([]);
  const currentPosRef       = useRef<Coord | null>(null);
  const currentBearingRef   = useRef(0);
  const lastWsUpdateTime    = useRef(0);

  // Route re-fetch control
  const routeGeoRef         = useRef<any>(null);       // mirror of routeGeo for use inside callbacks
  const customerRef         = useRef<Coord | null>(null);
  const lastRerouteTime     = useRef(0);
  const isFetchingRoute     = useRef(false);

  // WebSocket reconnection
  const wsRef               = useRef<WebSocket | null>(null);
  const reconnectAttempt    = useRef(0);
  const reconnectTimer      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intentionalClose    = useRef(false);           // set true on unmount so we don't reconnect

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
  const WS_HOST      = import.meta.env.VITE_TRACKERR_WS_HOST;
  const API_HOST     = import.meta.env.VITE_TRACKERR_HOST;

  // ── Snap: jump to position immediately, no animation ─────────────────────
  const snapTo = (pos: Coord) => {
    riderBufferRef.current = [];
    currentPosRef.current  = pos;
    setRiderCoord({ ...pos });
  };

  // ── Route fetch — shared between initial load and reroute ─────────────────
  const fetchRoute = useCallback((rider: Coord, customer: Coord) => {
    if (isFetchingRoute.current) return;
    isFetchingRoute.current = true;
    setRerouting(true);

    axiosInstance
      .get(
        `${API_HOST}/map/polyline` +
        `?rider_lng=${rider.lng}&rider_lat=${rider.lat}` +
        `&dest_lng=${customer.lng}&dest_lat=${customer.lat}`
      )
      .then((res) => {
        if (res.data.routes?.length) {
          const geo = res.data.routes[0].geometry;
          routeGeoRef.current = geo;
          setRouteGeo(geo);

          // If the backend returns duration in seconds, use it for ETA.
          // Fall back to the haversine estimate if not present.
          const durationSec = res.data.routes[0].duration;
          if (durationSec) {
            setEtaMinutes(Math.max(1, Math.round(durationSec / 60)));
          }
        }
      })
      .catch((err) => console.error("Route fetch error:", err))
      .finally(() => {
        isFetchingRoute.current = false;
        setRerouting(false);
        lastRerouteTime.current = Date.now();
      });
  }, [API_HOST]);

  // ── WebSocket — with exponential-backoff reconnection ────────────────────
  const connect = useCallback(() => {
    // Clear any pending reconnect timer before opening a new socket
    if (reconnectTimer.current) {
      clearTimeout(reconnectTimer.current);
      reconnectTimer.current = null;
    }

    const ws = new WebSocket(`${WS_HOST}/ws/tracking/`);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      reconnectAttempt.current = 0; // reset backoff on successful connect
      ws.send(JSON.stringify({ parcel_number: trackingNumber }));
    };

    ws.onerror = () => {
      // onclose always fires after onerror, so we handle reconnection there
    };

    ws.onclose = () => {
      setConnected(false);

      if (intentionalClose.current) return; // component unmounted — don't reconnect

      // Exponential backoff: 2 s → 4 s → 8 s … capped at 30 s
      const backoff = Math.min(
        WS_BASE_BACKOFF_MS * 2 ** reconnectAttempt.current,
        WS_MAX_BACKOFF_MS
      );
      reconnectAttempt.current += 1;

      console.log(`WS closed. Reconnecting in ${backoff / 1000}s (attempt ${reconnectAttempt.current})…`);

      reconnectTimer.current = setTimeout(() => {
        connect();
      }, backoff);
    };

    ws.onmessage = (event) => {
      const now = Date.now();
      if (now - lastWsUpdateTime.current < WS_THROTTLE_MS) return;
      lastWsUpdateTime.current = now;

      try {
        const data      = JSON.parse(event.data);
        const locations = data?.location_data?.locations;
        if (!locations) return;

        const rider: Coord    = locations.rider || locations.business_owner;
        const customer: Coord = locations.customer;
        if (!rider || !customer) return;

        customerRef.current = customer;

        // ETA + distance (pure math — no API call)
        const km = haversineKm(rider, customer);
        setDistanceKm(km);
        // Only use haversine ETA if we don't have a route-based one yet
        if (!routeGeoRef.current) {
          setEtaMinutes(Math.max(1, Math.round((km / 25) * 60)));
        }

        // ── First coordinate: SNAP, don't animate ──────────────────────────
        if (!currentPosRef.current) {
          snapTo(rider);

          if (mapRef.current && !hasFlownRef.current) {
            hasFlownRef.current = true;
            mapRef.current.flyTo({
              center:   [rider.lng, rider.lat],
              zoom:     16,
              pitch:    50,
              bearing:  0,
              duration: 1400,
            });
          }

          // Initial route fetch
          fetchRoute(rider, customer);

        } else {
          // Subsequent coords go into the animation buffer
          riderBufferRef.current.push(rider);

          // ── Deviation check — re-fetch route only when rider is meaningfully
          //    off the current route and the cooldown has elapsed ──────────────
          const now2        = Date.now();
          const cooledDown  = now2 - lastRerouteTime.current > REROUTE_COOLDOWN_MS;
          const hasRoute    = routeGeoRef.current?.coordinates?.length > 0;

          if (hasRoute && cooledDown && !isFetchingRoute.current) {
            const distToRoute = minDistToRouteKm(rider, routeGeoRef.current.coordinates);

            if (distToRoute > DEVIATION_THRESHOLD) {
              console.log(`Rider is ${(distToRoute * 1000).toFixed(0)} m off route — rerouting…`);
              fetchRoute(rider, customer);
            }
          }
        }
      } catch (err) {
        console.error("WS parse error:", err);
      }
    };
  }, [trackingNumber, WS_HOST, fetchRoute]);

  useEffect(() => {
    intentionalClose.current = false;
    connect();

    return () => {
      // Signal that the close is intentional so we don't trigger reconnection
      intentionalClose.current = true;
      wsRef.current?.close();
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
    };
  }, [connect]);

  // ── Animation Engine ──────────────────────────────────────────────────────
  useEffect(() => {
    let animFrame: number;
    let isAnimating = false;

    const processNext = () => {
      if (isAnimating) return;

      // Too many queued coords → fallen behind → snap to latest
      if (riderBufferRef.current.length > BUFFER_LIMIT) {
        const latest = riderBufferRef.current[riderBufferRef.current.length - 1];
        snapTo(latest);
        animFrame = requestAnimationFrame(processNext);
        return;
      }

      const next = riderBufferRef.current.shift();
      if (!next) {
        animFrame = requestAnimationFrame(processNext);
        return;
      }

      const start = currentPosRef.current ?? next;
      const moved = Math.hypot(next.lng - start.lng, next.lat - start.lat);

      if (moved < 0.000005) {
        animFrame = requestAnimationFrame(processNext);
        return;
      }

      isAnimating = true;

      const targetBearing = calcBearing(start, next);
      const startBearing  = currentBearingRef.current;
      const t0            = performance.now();

      const animate = (now: number) => {
        const raw  = Math.min((now - t0) / ANIM_DURATION, 1);
        const ease = easeInOutCubic(raw);

        const interpolated: Coord = {
          lng: start.lng + (next.lng - start.lng) * ease,
          lat: start.lat + (next.lat - start.lat) * ease,
        };

        const smoothBearing       = lerpBearing(startBearing, targetBearing, ease);
        currentBearingRef.current = smoothBearing;
        currentPosRef.current     = interpolated;

        setRiderCoord({ ...interpolated });
        setBearing(smoothBearing);

        if (mapRef.current) {
          mapRef.current.easeTo({
            center:   [interpolated.lng, interpolated.lat],
            duration: 0,
          });
        }

        if (raw < 1) {
          animFrame = requestAnimationFrame(animate);
        } else {
          isAnimating = false;
          animFrame   = requestAnimationFrame(processNext);
        }
      };

      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(processNext);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // ── Derived ───────────────────────────────────────────────────────────────
  const destination =
    routeGeo?.coordinates?.length > 0
      ? routeGeo.coordinates[routeGeo.coordinates.length - 1]
      : null;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl relative select-none">

      {/* ETA panel */}
      {etaMinutes !== null && (
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-0.5 bg-black/75 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/10">
          <span className="text-[10px] font-semibold text-white/45 uppercase tracking-[0.12em]">
            Estimated arrival
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-[2rem] font-bold leading-none tabular-nums">
              {etaMinutes}
            </span>
            <span className="text-sm text-white/60 font-medium">min</span>
            {distanceKm !== null && (
              <span className="text-xs text-white/35 ml-1">
                · {distanceKm.toFixed(1)} km
              </span>
            )}
          </div>
          {/* Subtle rerouting indicator — only visible while re-fetching */}
          {rerouting && (
            <span className="text-[10px] text-amber-400/80 mt-1 animate-pulse">
              Updating route…
            </span>
          )}
        </div>
      )}

      {/* Connection status */}
      <div
        className={`
          absolute top-4 right-4 z-10 flex items-center gap-1.5
          px-3 py-1.5 rounded-full text-[11px] font-semibold
          border backdrop-blur-md shadow-lg transition-colors duration-500
          ${connected
            ? "bg-emerald-950/80 border-emerald-700/30 text-emerald-400"
            : "bg-red-950/80   border-red-700/30   text-red-400"}
        `}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            connected ? "bg-emerald-400 animate-pulse" : "bg-red-400 animate-pulse"
          }`}
        />
        {connected ? "Live" : "Reconnecting…"}
      </div>

      {/* Map */}
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: 8.6753, latitude: 9.082, zoom: 10 }}
        ref={mapRef}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        attributionControl={false}
      >
        {routeGeo?.coordinates && (
          <Source id="route" type="geojson" data={routeGeo}>
            <Layer
              id="route-shadow"
              type="line"
              layout={{ "line-cap": "round", "line-join": "round" }}
              paint={{ "line-color": "#000000", "line-width": 10, "line-opacity": 0.25, "line-blur": 4 }}
            />
            <Layer
              id="route-line"
              type="line"
              layout={{ "line-cap": "round", "line-join": "round" }}
              paint={{ "line-color": "#3B82F6", "line-width": 5, "line-opacity": 0.9 }}
            />
          </Source>
        )}

        {destination && (
          <Marker longitude={destination[0]} latitude={destination[1]} anchor="center">
            <DestinationMarker />
          </Marker>
        )}

        {riderCoord && (
          <Marker longitude={riderCoord.lng} latitude={riderCoord.lat} anchor="center">
            <RiderMarker bearing={bearing} />
          </Marker>
        )}
      </Map>
    </div>
  );
}

export default memo(LiveTrackingMap);
