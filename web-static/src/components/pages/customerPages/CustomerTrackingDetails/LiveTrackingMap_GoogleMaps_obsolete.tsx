import { useEffect, useRef, useState, memo, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../api/axiosInstance";

// ─────────────────────────────────────────────────────────────────────────────
// NOTE ON SETUP
// ─────────────────────────────────────────────────────────────────────────────
// 1. npm install @react-google-maps/api
// 2. You need a Google Maps "Map ID" (vector-rendered map) to use
//    AdvancedMarkerElement — create one in Google Cloud Console under
//    Maps Platform → Map Management. Raster maps (no Map ID) can't host
//    AdvancedMarkerElement or animated tilt/heading via moveCamera.
// 3. Env vars expected: VITE_GOOGLE_MAPS_API_KEY, VITE_GOOGLE_MAP_ID
//
// KNOWN PARITY GAPS vs the Mapbox version (be aware while testing):
// - Google's JS API has no built-in "flyTo(duration)". We approximate it
//   with a custom requestAnimationFrame camera ease (easeCamera below).
// - Mapbox distinguishes user vs. programmatic zoom via evt.originalEvent.
//   Google doesn't expose an equivalent for zoom, so "following" only
//   breaks on drag here, not on scroll/pinch zoom. Flag if you need that.
// - Polyline has no native blur, so the route "shadow" layer is a plain
//   semi-transparent line underneath, not a blurred one.
// ─────────────────────────────────────────────────────────────────────────────

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
const BUFFER_LIMIT          = 3;
const ANIM_DURATION         = 800;
const WS_THROTTLE_MS        = 100;
const DEVIATION_THRESHOLD   = 0.05;   // km (50 m) before route is re-fetched
const REROUTE_COOLDOWN_MS   = 15000;
const WS_BASE_BACKOFF_MS    = 2000;
const WS_MAX_BACKOFF_MS     = 30000;
const MIN_MOVEMENT_KM       = 0.003;  // ~3 m — below this treat as GPS noise
const DEAD_RECKON_TICK_MS   = 1000;
const DEAD_RECKON_TRIGGER_MS = 4000;
const DEAD_RECKON_MAX_MS    = 12000;
const ETA_TICK_MS           = 1000;
const FLY_TO_DURATION_MS    = 1400;

const GOOGLE_MAPS_LIBRARIES: ("marker")[] = ["marker"];
const MAP_CONTAINER_STYLE = { width: "100%", height: "100%" };
const DEFAULT_CENTER = { lat: 9.082, lng: 8.6753 };

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

function lerpBearing(from: number, to: number, t: number): number {
  const diff = ((to - from + 540) % 360) - 180;
  return from + diff * t;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function pointToSegmentKm(p: Coord, a: Coord, b: Coord): number {
  const latRad = (a.lat * Math.PI) / 180;
  const kx     = Math.cos(latRad);

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

/** GeoJSON-style [lng, lat] pairs (what your /map/polyline backend returns)
 *  → Google's {lat, lng} object format. Easy to get backwards — Google is
 *  lat-first, GeoJSON is lng-first. */
function toLatLngPath(coords: number[][]): google.maps.LatLngLiteral[] {
  return coords.map(([lng, lat]) => ({ lat, lng }));
}

/** Rider puck DOM element — built once, mutated directly afterwards
 *  (position via AdvancedMarkerElement#position, heading via a style
 *  transform) so a 60fps animation never triggers a React re-render. */
function createRiderElement(): { root: HTMLDivElement; rotor: HTMLDivElement } {
  const root = document.createElement("div");
  root.style.willChange = "transform";
  root.style.transform  = "translate(-50%, -50%)"; // AdvancedMarkerElement anchors top-left by default

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

function createDestinationElement(): HTMLDivElement {
  const root = document.createElement("div");
  root.style.transform = "translate(-50%, -50%)";
  root.className = "relative flex items-center justify-center";
  root.innerHTML = `
    <div class="absolute h-16 w-16 rounded-full bg-blue-400/20 animate-ping"></div>
    <div class="absolute h-9 w-9 rounded-full bg-blue-500/25"></div>
    <div class="w-5 h-5 bg-blue-500 rounded-full border-[2.5px] border-white shadow-xl"></div>`;
  return root;
}

/** Custom camera "flyTo" — Google's JS API has no built-in eased flight with
 *  duration, so we interpolate center/zoom/tilt ourselves. Requires a
 *  vector map (Map ID) for tilt to have any visible effect. */
function easeCamera(
  map: google.maps.Map,
  target: { lat: number; lng: number; zoom: number; tilt?: number },
  durationMs = FLY_TO_DURATION_MS
) {
  const startCenter = map.getCenter();
  if (!startCenter) {
    map.moveCamera({ center: target, zoom: target.zoom, tilt: target.tilt ?? 0 });
    return;
  }
  const start = {
    lat: startCenter.lat(),
    lng: startCenter.lng(),
    zoom: map.getZoom() ?? target.zoom,
    tilt: (map as any).getTilt?.() ?? 0,
  };
  const t0 = performance.now();

  const step = (now: number) => {
    const raw  = Math.min((now - t0) / durationMs, 1);
    const ease = easeInOutCubic(raw);
    map.moveCamera({
      center: {
        lat: start.lat + (target.lat - start.lat) * ease,
        lng: start.lng + (target.lng - start.lng) * ease,
      },
      zoom: start.zoom + (target.zoom - start.zoom) * ease,
      tilt: start.tilt + ((target.tilt ?? 0) - start.tilt) * ease,
    });
    if (raw < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────
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

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const GOOGLE_MAP_ID       = import.meta.env.VITE_GOOGLE_MAPS_ID;
  const WS_HOST             = import.meta.env.VITE_TRACKERR_WS_HOST;
  const API_HOST            = import.meta.env.VITE_TRACKERR_HOST;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    mapIds: GOOGLE_MAP_ID ? [GOOGLE_MAP_ID] : undefined,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const [etaMinutes, setEtaMinutes] = useState<number | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [connected,  setConnected]  = useState(false);
  const [routeGeo,   setRouteGeo]   = useState<any>(null);
  const [rerouting,  setRerouting]  = useState(false);
  const [hasRider,   setHasRider]   = useState(false);
  const [following,  setFollowing]  = useState(true);

  const mapInstanceRef      = useRef<google.maps.Map | null>(null);
  const hasFlownRef         = useRef(false);
  const followingRef        = useRef(true);
  const userInteractingRef  = useRef(false);

  // Imperative rider puck
  const riderMarkerRef       = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const riderRotorElRef      = useRef<HTMLDivElement | null>(null);
  const pendingFirstRiderRef = useRef<Coord | null>(null);

  // Destination puck
  const destMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  // Route polyline (created once, path updated on reroute)
  const routeLineRef       = useRef<google.maps.Polyline | null>(null);
  const routeLineShadowRef = useRef<google.maps.Polyline | null>(null);

  // Animation state in refs — never triggers re-renders
  const riderBufferRef      = useRef<Coord[]>([]);
  const currentPosRef       = useRef<Coord | null>(null);
  const currentBearingRef   = useRef(0);
  const lastWsUpdateTime    = useRef(0);

  // Dead reckoning
  const lastMessageTimeRef  = useRef(Date.now());
  const lastVelocityRef     = useRef<Velocity | null>(null);
  const prevRiderForVelocityRef = useRef<{ coord: Coord; t: number } | null>(null);

  // ETA countdown
  const etaTargetRef = useRef<number | null>(null);

  // Route re-fetch control
  const routeGeoRef        = useRef<any>(null);
  const customerRef        = useRef<Coord | null>(null);
  const lastRerouteTime    = useRef(0);
  const isFetchingRoute    = useRef(false);

  // WebSocket reconnection
  const wsRef             = useRef<WebSocket | null>(null);
  const reconnectAttempt  = useRef(0);
  const reconnectTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intentionalClose  = useRef(false);

  useEffect(() => {
    followingRef.current = following;
  }, [following]);

  // ── Rider puck lifecycle ───────────────────────────────────────────────────
  const ensureRiderMarker = useCallback((at: Coord) => {
    const map = mapInstanceRef.current;
    if (!map || riderMarkerRef.current || !window.google?.maps?.marker) return;

    const { root, rotor } = createRiderElement();
    riderRotorElRef.current = rotor;
    riderMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: at.lat, lng: at.lng },
      content: root,
      zIndex: 10,
    });

    setHasRider(true);

    if (!hasFlownRef.current) {
      hasFlownRef.current = true;
      easeCamera(map, { lat: at.lat, lng: at.lng, zoom: 16, tilt: 50 });
    }
  }, []);

  // ── Snap: jump to position immediately, no animation ─────────────────────
  const snapTo = (pos: Coord) => {
    riderBufferRef.current = [];
    currentPosRef.current  = pos;
    if (riderMarkerRef.current) {
      riderMarkerRef.current.position = { lat: pos.lat, lng: pos.lng };
    }
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

    ws.onerror = () => {};

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

        const km = haversineKm(rider, customer);
        setDistanceKm(km);
        if (!routeGeoRef.current) {
          const estMinutes = Math.max(1, (km / 25) * 60);
          etaTargetRef.current = Date.now() + estMinutes * 60000;
          setEtaMinutes(Math.round(estMinutes));
        }

        if (!currentPosRef.current) {
          currentPosRef.current = rider;
          if (mapInstanceRef.current) {
            ensureRiderMarker(rider);
          } else {
            pendingFirstRiderRef.current = rider;
          }
          fetchRoute(rider, customer);
        } else {
          riderBufferRef.current.push(rider);

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

    hasFlownRef.current       = false;
    currentPosRef.current     = null;
    riderBufferRef.current    = [];
    currentBearingRef.current = 0;
    routeGeoRef.current       = null;
    customerRef.current       = null;
    lastRerouteTime.current   = 0;
    isFetchingRoute.current   = false;
    etaTargetRef.current      = null;
    lastMessageTimeRef.current = Date.now();
    lastVelocityRef.current   = null;
    prevRiderForVelocityRef.current = null;
    pendingFirstRiderRef.current = null;

    riderMarkerRef.current && (riderMarkerRef.current.map = null);
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

  // ── ETA countdown ──────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      if (etaTargetRef.current != null) {
        const remainingMs = etaTargetRef.current - Date.now();
        setEtaMinutes(Math.max(0, Math.round(remainingMs / 60000)));
      }
    }, ETA_TICK_MS);
    return () => clearInterval(id);
  }, []);

  // ── Dead reckoning ──────────────────────────────────────────────────────────
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

      if (movedKm < MIN_MOVEMENT_KM) {
        currentPosRef.current = next;
        if (riderMarkerRef.current) {
          riderMarkerRef.current.position = { lat: next.lat, lng: next.lng };
        }
        animFrame = requestAnimationFrame(processNext);
        return;
      }

      isAnimating = true;

      const targetBearing = calcBearing(start, next);
      const startBearing  = currentBearingRef.current;
      const t0             = performance.now();
      const map             = mapInstanceRef.current;

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

        if (riderMarkerRef.current) {
          riderMarkerRef.current.position = { lat: interpolated.lat, lng: interpolated.lng };
        }
        if (riderRotorElRef.current) {
          riderRotorElRef.current.style.transform = `rotate(${smoothBearing}deg)`;
        }

        if (followingRef.current && !userInteractingRef.current && map) {
          map.setCenter({ lat: interpolated.lat, lng: interpolated.lng });
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

  // ── Route polyline — create once, update path on reroute ──────────────────
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !routeGeo?.coordinates) return;

    const path = toLatLngPath(routeGeo.coordinates);

    if (!routeLineRef.current) {
      routeLineShadowRef.current = new google.maps.Polyline({
        map,
        path,
        strokeColor: "#000000",
        strokeOpacity: 0.2,
        strokeWeight: 10,
        zIndex: 1,
      });
      routeLineRef.current = new google.maps.Polyline({
        map,
        path,
        strokeColor: "#3B82F6",
        strokeOpacity: 0.9,
        strokeWeight: 5,
        zIndex: 2,
      });
    } else {
      routeLineShadowRef.current?.setPath(path);
      routeLineRef.current.setPath(path);
    }
  }, [routeGeo]);

  // ── Destination marker — created once a route exists, updated if it moves ─
  useEffect(() => {
    const map = mapInstanceRef.current;
    const destination =
      routeGeo?.coordinates?.length > 0
        ? routeGeo.coordinates[routeGeo.coordinates.length - 1]
        : null;
    if (!map || !destination || !window.google?.maps?.marker) return;

    const pos = { lat: destination[1], lng: destination[0] };

    if (!destMarkerRef.current) {
      destMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: pos,
        content: createDestinationElement(),
        zIndex: 5,
      });
    } else {
      destMarkerRef.current.position = pos;
    }
  }, [routeGeo]);

  // ── Map lifecycle / user-gesture detection ────────────────────────────────
  const handleMapLoad = (map: google.maps.Map) => {
    mapInstanceRef.current = map;
    const initial = currentPosRef.current ?? pendingFirstRiderRef.current;
    if (initial) ensureRiderMarker(initial);
  };

  // Google's JS API only reliably distinguishes user-initiated drags this
  // way — there's no equivalent to Mapbox's evt.originalEvent for zoom, so
  // scroll/pinch zoom won't break "following" here (see header note).
  const handleDragStart = () => {
    userInteractingRef.current = true;
    setFollowing(false);
  };

  const handleRecenter = () => {
    const map = mapInstanceRef.current;
    if (map && currentPosRef.current) {
      userInteractingRef.current = false;
      setFollowing(true);
      easeCamera(map, { lat: currentPosRef.current.lat, lng: currentPosRef.current.lng, zoom: 16 }, 600);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      riderMarkerRef.current && (riderMarkerRef.current.map = null);
      destMarkerRef.current && (destMarkerRef.current.map = null);
      routeLineRef.current?.setMap(null);
      routeLineShadowRef.current?.setMap(null);
    };
  }, []);

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

      {hasRider && !following && <RecenterButton onClick={handleRecenter} />}

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={10}
          options={{
            mapId: GOOGLE_MAP_ID,
            disableDefaultUI: true,
            gestureHandling: "greedy",
          }}
          onLoad={handleMapLoad}
          onDragStart={handleDragStart}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-400 text-sm">
          Loading map…
        </div>
      )}
    </div>
  );
}

export default memo(LiveTrackingMap);