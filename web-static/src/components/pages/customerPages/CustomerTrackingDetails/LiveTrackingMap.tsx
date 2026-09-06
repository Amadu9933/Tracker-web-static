import { useEffect, useRef, useState, memo, useCallback } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
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

interface Velocity {
  dLngPerSec: number;
  dLatPerSec: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const BUFFER_LIMIT          = 3;      // drain to latest if queue exceeds this
const ANIM_DURATION         = 800;    // ms per coordinate step
const WS_THROTTLE_MS        = 100;    // ignore WS messages faster than this
const DEVIATION_THRESHOLD   = 0.05;   // km (50 m) before route is re-fetched
const REROUTE_COOLDOWN_MS   = 15000;  // minimum ms between route re-fetches
const WS_BASE_BACKOFF_MS    = 2000;   // initial reconnect wait
const WS_MAX_BACKOFF_MS     = 30000;  // reconnect wait cap
const MIN_MOVEMENT_KM       = 0.003;  // ~3 m — below this treat as GPS noise, not real motion
const DEAD_RECKON_TICK_MS   = 1000;   // how often we extrapolate during a WS gap
const DEAD_RECKON_TRIGGER_MS = 4000;  // start extrapolating after this much silence
const DEAD_RECKON_MAX_MS    = 12000;  // give up extrapolating after this much silence
const ETA_TICK_MS           = 1000;   // countdown resolution

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
 * Distance in km from point p to the segment a→b, using an equirectangular
 * projection (accurate enough at the scale of a single route segment) so we
 * measure against the *road*, not just the nearest vertex. A long straight
 * stretch with sparse vertices no longer looks like a "deviation".
 */
function pointToSegmentKm(p: Coord, a: Coord, b: Coord): number {
  const latRad = (a.lat * Math.PI) / 180;
  const kx     = Math.cos(latRad); // longitude scale factor at this latitude

  const ax = a.lng * kx, ay = a.lat;
  const bx = b.lng * kx, by = b.lat;
  const px = p.lng * kx, py = p.lat;

  const dx = bx - ax, dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  let t = lenSq === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));

  const projLng = (ax + t * dx) / kx;
  const projLat = ay + t * dy;

  return haversineKm(p, { lng: projLng, lat: projLat });
}

function minDistToRouteKm(rider: Coord, routeCoords: number[][]): number {
  if (routeCoords.length === 1) {
    return haversineKm(rider, { lng: routeCoords[0][0], lat: routeCoords[0][1] });
  }
  let min = Infinity;
  for (let i = 0; i < routeCoords.length - 1; i++) {
    const a = { lng: routeCoords[i][0], lat: routeCoords[i][1] };
    const b = { lng: routeCoords[i + 1][0], lat: routeCoords[i + 1][1] };
    const d = pointToSegmentKm(rider, a, b);
    if (d < min) min = d;
  }
  return min;
}

/** Builds the DOM element for the rider puck once. We mutate it directly
 *  afterwards (position via mapboxgl.Marker#setLngLat, heading via a style
 *  transform) instead of going through React state, so a 60fps animation
 *  never triggers a React re-render. */
function createRiderElement(): { root: HTMLDivElement; rotor: HTMLDivElement } {
  const root = document.createElement("div");
  root.style.willChange = "transform";

  const rotor = document.createElement("div");
  rotor.style.transition = "transform 0.25s ease-out";
  rotor.style.filter     = "drop-shadow(0 4px 14px rgba(234,88,12,0.65))";
  rotor.innerHTML = `
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#EA580C" fill-opacity="0.18" />
      <circle cx="20" cy="20" r="16" fill="#EA580C" />
      <path d="M20 9 L26.5 29 L20 24.5 L13.5 29 Z" fill="white" />
    </svg>`;

  root.appendChild(rotor);
  return { root, rotor };
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────
const DestinationMarker = memo(function DestinationMarker() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute h-16 w-16 rounded-full bg-blue-400/20 animate-ping" />
      <div className="absolute h-9  w-9  rounded-full bg-blue-500/25" />
      <div className="w-5 h-5 bg-blue-500 rounded-full border-[2.5px] border-white shadow-xl" />
    </div>
  );
});

const RecenterButton = memo(function RecenterButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Recenter on rider"
      className="absolute bottom-6 right-4 z-10 flex items-center justify-center
                 w-11 h-11 rounded-full bg-white text-neutral-800 shadow-2xl
                 border border-black/5 hover:bg-neutral-50 active:scale-95
                 transition-all duration-150"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L12 6M12 18L12 22M2 12L6 12M18 12L22 12"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
function LiveTrackingMap() {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();

  const [etaMinutes, setEtaMinutes] = useState<number | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [connected,  setConnected]  = useState(false);
  const [routeGeo,   setRouteGeo]   = useState<any>(null);
  const [rerouting,  setRerouting]  = useState(false);
  const [hasRider,   setHasRider]   = useState(false); // becomes true once the puck exists
  const [following,  setFollowing]  = useState(true);  // camera auto-follows rider

  const mapRef              = useRef<any>(null);
  const mapLoadedRef        = useRef(false);
  const hasFlownRef         = useRef(false);
  const followingRef        = useRef(true);
  const userInteractingRef  = useRef(false);

  // Imperative rider puck — bypasses React for 60fps updates
  const riderMarkerRef      = useRef<mapboxgl.Marker | null>(null);
  const riderRotorElRef     = useRef<HTMLDivElement | null>(null);
  const pendingFirstRiderRef = useRef<Coord | null>(null);

  // Animation state in refs — never triggers re-renders
  const riderBufferRef      = useRef<Coord[]>([]);
  const currentPosRef       = useRef<Coord | null>(null);
  const currentBearingRef   = useRef(0);
  const lastWsUpdateTime    = useRef(0);

  // Dead reckoning — keeps the puck moving smoothly through brief WS gaps
  const lastMessageTimeRef  = useRef(Date.now());
  const lastVelocityRef     = useRef<Velocity | null>(null);
  const prevRiderForVelocityRef = useRef<{ coord: Coord; t: number } | null>(null);

  // ETA — ticks down independently of when the last route/WS update landed
  const etaTargetRef        = useRef<number | null>(null); // epoch ms of expected arrival

  // Route re-fetch control
  const routeGeoRef         = useRef<any>(null);
  const customerRef         = useRef<Coord | null>(null);
  const lastRerouteTime     = useRef(0);
  const isFetchingRoute     = useRef(false);

  // WebSocket reconnection
  const wsRef               = useRef<WebSocket | null>(null);
  const reconnectAttempt    = useRef(0);
  const reconnectTimer      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intentionalClose    = useRef(false);

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
  const WS_HOST      = import.meta.env.VITE_TRACKERR_WS_HOST;
  const API_HOST     = import.meta.env.VITE_TRACKERR_HOST;

  useEffect(() => {
    followingRef.current = following;
  }, [following]);

  // ── Rider puck lifecycle ───────────────────────────────────────────────────
  const ensureRiderMarker = useCallback((at: Coord) => {
    const map = mapRef.current?.getMap?.();
    if (!map || riderMarkerRef.current) return;

    const { root, rotor } = createRiderElement();
    riderRotorElRef.current = rotor;
    riderMarkerRef.current = new mapboxgl.Marker({ element: root, anchor: "center" })
      .setLngLat([at.lng, at.lat])
      .addTo(map);

    setHasRider(true);

    if (!hasFlownRef.current) {
      hasFlownRef.current = true;
      map.flyTo({ center: [at.lng, at.lat], zoom: 16, pitch: 50, bearing: 0, duration: 1400 });
    }
  }, []);

  // ── Snap: jump to position immediately, no animation ─────────────────────
  const snapTo = (pos: Coord) => {
    riderBufferRef.current = [];
    currentPosRef.current  = pos;
    riderMarkerRef.current?.setLngLat([pos.lng, pos.lat]);
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

          const durationSec = res.data.routes[0].duration;
          if (durationSec) {
            etaTargetRef.current = Date.now() + durationSec * 1000;
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
    if (reconnectTimer.current) {
      clearTimeout(reconnectTimer.current);
      reconnectTimer.current = null;
    }

    const ws = new WebSocket(`${WS_HOST}/ws/tracking/`);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      reconnectAttempt.current = 0;
      ws.send(JSON.stringify({ parcel_number: trackingNumber }));
    };

    ws.onerror = () => {
      // onclose always fires after onerror, so reconnection is handled there
    };

    ws.onclose = () => {
      setConnected(false);
      if (intentionalClose.current) return;

      const backoff = Math.min(
        WS_BASE_BACKOFF_MS * 2 ** reconnectAttempt.current,
        WS_MAX_BACKOFF_MS
      );
      reconnectAttempt.current += 1;

      reconnectTimer.current = setTimeout(() => connect(), backoff);
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

        // Track velocity for dead-reckoning through WS gaps
        if (prevRiderForVelocityRef.current) {
          const dt = (now - prevRiderForVelocityRef.current.t) / 1000;
          if (dt > 0.2) {
            lastVelocityRef.current = {
              dLngPerSec: (rider.lng - prevRiderForVelocityRef.current.coord.lng) / dt,
              dLatPerSec: (rider.lat - prevRiderForVelocityRef.current.coord.lat) / dt,
            };
          }
        }
        prevRiderForVelocityRef.current = { coord: rider, t: now };
        lastMessageTimeRef.current = now;

        // ETA + distance (pure math — no API call)
        const km = haversineKm(rider, customer);
        setDistanceKm(km);
        if (!routeGeoRef.current) {
          const estMinutes = Math.max(1, (km / 25) * 60);
          etaTargetRef.current = Date.now() + estMinutes * 60000;
          setEtaMinutes(Math.round(estMinutes));
        }

        // ── First coordinate: SNAP, don't animate ──────────────────────────
        if (!currentPosRef.current) {
          currentPosRef.current = rider;
          if (mapLoadedRef.current) {
            ensureRiderMarker(rider);
          } else {
            pendingFirstRiderRef.current = rider;
          }
          fetchRoute(rider, customer);
        } else {
          riderBufferRef.current.push(rider);

          // ── Deviation check — re-fetch only if meaningfully off-route and
          //    the cooldown has elapsed. Checked against segments, not just
          //    vertices, so long straight roads don't false-trigger. ────────
          const cooledDown = now - lastRerouteTime.current > REROUTE_COOLDOWN_MS;
          const hasRoute   = routeGeoRef.current?.coordinates?.length > 0;

          if (hasRoute && cooledDown && !isFetchingRoute.current) {
            const distToRoute = minDistToRouteKm(rider, routeGeoRef.current.coordinates);
            if (distToRoute > DEVIATION_THRESHOLD) {
              fetchRoute(rider, customer);
            }
          }
        }
      } catch (err) {
        console.error("WS parse error:", err);
      }
    };
  }, [trackingNumber, WS_HOST, fetchRoute, ensureRiderMarker]);

  // ── (Re)connect, resetting all per-trip state when trackingNumber changes ─
  useEffect(() => {
    intentionalClose.current = false;

    hasFlownRef.current      = false;
    currentPosRef.current    = null;
    riderBufferRef.current   = [];
    currentBearingRef.current = 0;
    routeGeoRef.current      = null;
    customerRef.current      = null;
    lastRerouteTime.current  = 0;
    isFetchingRoute.current  = false;
    etaTargetRef.current     = null;
    lastMessageTimeRef.current = Date.now();
    lastVelocityRef.current  = null;
    prevRiderForVelocityRef.current = null;
    pendingFirstRiderRef.current = null;

    riderMarkerRef.current?.remove();
    riderMarkerRef.current  = null;
    riderRotorElRef.current = null;

    setRouteGeo(null);
    setEtaMinutes(null);
    setDistanceKm(null);
    setRerouting(false);
    setHasRider(false);
    setFollowing(true);

    connect();

    return () => {
      intentionalClose.current = true;
      wsRef.current?.close();
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
    };
  }, [connect]);

  // ── ETA countdown — independent of WS/route cadence, so it never "sticks" ─
  useEffect(() => {
    const id = setInterval(() => {
      if (etaTargetRef.current != null) {
        const remainingMs = etaTargetRef.current - Date.now();
        setEtaMinutes(Math.max(0, Math.round(remainingMs / 60000)));
      }
    }, ETA_TICK_MS);
    return () => clearInterval(id);
  }, []);

  // ── Dead reckoning — extrapolate through brief WS silence ─────────────────
  useEffect(() => {
    const id = setInterval(() => {
      const silence = Date.now() - lastMessageTimeRef.current;
      if (
        silence > DEAD_RECKON_TRIGGER_MS &&
        silence < DEAD_RECKON_MAX_MS &&
        lastVelocityRef.current &&
        currentPosRef.current &&
        riderBufferRef.current.length === 0
      ) {
        const dtSec = DEAD_RECKON_TICK_MS / 1000;
        riderBufferRef.current.push({
          lng: currentPosRef.current.lng + lastVelocityRef.current.dLngPerSec * dtSec,
          lat: currentPosRef.current.lat + lastVelocityRef.current.dLatPerSec * dtSec,
        });
      }
    }, DEAD_RECKON_TICK_MS);
    return () => clearInterval(id);
  }, []);

  // ── Animation Engine — mutates the marker directly, no React state ────────
  useEffect(() => {
    let animFrame: number;
    let isAnimating = false;

    const processNext = () => {
      if (isAnimating) return;

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

      const start   = currentPosRef.current ?? next;
      const movedKm = haversineKm(start, next);

      // Below GPS-noise floor — don't spin the heading over nothing
      if (movedKm < MIN_MOVEMENT_KM) {
        currentPosRef.current = next;
        riderMarkerRef.current?.setLngLat([next.lng, next.lat]);
        animFrame = requestAnimationFrame(processNext);
        return;
      }

      isAnimating = true;

      const targetBearing = calcBearing(start, next);
      const startBearing  = currentBearingRef.current;
      const t0            = performance.now();
      const map            = mapRef.current?.getMap?.();

      const animate = (now: number) => {
        const raw  = Math.min((now - t0) / ANIM_DURATION, 1);
        const ease = easeInOutCubic(raw);

        const interpolated: Coord = {
          lng: start.lng + (next.lng - start.lng) * ease,
          lat: start.lat + (next.lat - start.lat) * ease,
        };

        const smoothBearing        = lerpBearing(startBearing, targetBearing, ease);
        currentBearingRef.current  = smoothBearing;
        currentPosRef.current      = interpolated;

        riderMarkerRef.current?.setLngLat([interpolated.lng, interpolated.lat]);
        if (riderRotorElRef.current) {
          riderRotorElRef.current.style.transform = `rotate(${smoothBearing}deg)`;
        }

        // Camera follows only while the user hasn't taken over the map
        if (followingRef.current && !userInteractingRef.current && map) {
          map.easeTo({ center: [interpolated.lng, interpolated.lat], duration: 0 });
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

  // ── Map lifecycle / user-gesture detection ────────────────────────────────
  const handleMapLoad = () => {
    mapLoadedRef.current = true;
    const initial = currentPosRef.current ?? pendingFirstRiderRef.current;
    if (initial) ensureRiderMarker(initial);
  };

  // mapboxgl only sets `originalEvent` on genuine user gestures, not on
  // programmatic flyTo/easeTo calls — so this won't false-trigger when we
  // move the camera ourselves.
  const handleUserGestureStart = (evt: any) => {
    if (evt?.originalEvent) {
      userInteractingRef.current = true;
      setFollowing(false);
    }
  };

  const handleRecenter = () => {
    const map = mapRef.current?.getMap?.();
    if (map && currentPosRef.current) {
      userInteractingRef.current = false;
      setFollowing(true);
      map.easeTo({ center: [currentPosRef.current.lng, currentPosRef.current.lat], zoom: 16, duration: 600 });
    }
  };

  // Cleanup the imperative marker on full unmount
  useEffect(() => {
    return () => {
      riderMarkerRef.current?.remove();
    };
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

      {/* Recenter control — only shown once the user has panned/zoomed away */}
      {hasRider && !following && <RecenterButton onClick={handleRecenter} />}

      {/* Map */}
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: 8.6753, latitude: 9.082, zoom: 10 }}
        ref={mapRef}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        attributionControl={false}
        onLoad={handleMapLoad}
        onDragStart={handleUserGestureStart}
        onZoomStart={handleUserGestureStart}
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

        {/* Rider puck is added/moved imperatively via riderMarkerRef — not rendered here */}
      </Map>
    </div>
  );
}

export default memo(LiveTrackingMap);