import { useEffect, useRef, useState } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";
import { useParams } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import axiosInstance from "../../../../api/axiosInstance";

export default function LiveTrackingMap() {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();

  const [riderCoord, setRiderCoord] = useState<{ lng: number; lat: number } | null>(null);
  const [bearing, setBearing] = useState(0);
  const [etaMinutes, setEtaMinutes] = useState<number | null>(null);

  const [, forceUI] = useState(0);

  const routeRef = useRef<any>(null);
  const mapRef = useRef<any>(null);

  const hasFlownRef = useRef(false);
  const initialRouteFetched = useRef(false);

  const riderBufferRef = useRef<any[]>([]);
  const currentPosRef = useRef<any>(null);

  const lastFetchedRiderLocation = useRef<any>(null);
  const lastWsUpdateTime = useRef(0);

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
  const VITE_TRACKERR_WS_HOST = import.meta.env.VITE_TRACKERR_WS_HOST;
  const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;

  const UBER_MAP_STYLE = "mapbox://styles/mapbox/navigation-night-v1";

  const calculateBearing = (start: any, end: any) => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    const toDegrees = (rad: number) => (rad * 180) / Math.PI;

    const dLng = toRadians(end.lng) - toRadians(start.lng);

    const y = Math.sin(dLng) * Math.cos(toRadians(end.lat));
    const x =
      Math.cos(toRadians(start.lat)) * Math.sin(toRadians(end.lat)) -
      Math.sin(toRadians(start.lat)) *
        Math.cos(toRadians(end.lat)) *
        Math.cos(dLng);

    return (toDegrees(Math.atan2(y, x)) + 360) % 360;
  };

  const estimateETA = (rider: any, customer: any) => {
    const R = 6371;

    const dLat = ((customer.lat - rider.lat) * Math.PI) / 180;
    const dLng = ((customer.lng - rider.lng) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((rider.lat * Math.PI) / 180) *
        Math.cos((customer.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const km = R * c;

    const speedKmh = 25;
    return Math.max(1, Math.round((km / speedKmh) * 60));
  };

  // -------------------------
  // WebSocket
  // -------------------------
  useEffect(() => {
    const ws = new WebSocket(`${VITE_TRACKERR_WS_HOST}/ws/tracking/`);

    ws.onopen = () => {
      ws.send(JSON.stringify({ parcel_number: trackingNumber }));
    };

    ws.onmessage = (event) => {
      const now = Date.now();
      if (now - lastWsUpdateTime.current < 300) return;
      lastWsUpdateTime.current = now;

      try {
        const data = JSON.parse(event.data);
        const locations = data?.location_data?.locations;
        if (!locations) return;

        const rider = locations.rider || locations.business_owner;
        const customer = locations.customer;
        if (!rider || !customer) return;

        setEtaMinutes(estimateETA(rider, customer));

        riderBufferRef.current.push(rider);

        // ✅ FIX 1: INITIALIZE POSITION PROPERLY
        if (!currentPosRef.current) {
          currentPosRef.current = rider;

          setRiderCoord(rider);

          // 🔥 FIX 2: AUTO FLY TO INITIAL POSITION
          if (mapRef.current && !hasFlownRef.current) {
            hasFlownRef.current = true;
            mapRef.current.flyTo({
              center: [rider.lng, rider.lat],
              zoom: 15,
              pitch: 45,
            });
          }
        }

        if (!initialRouteFetched.current) {
          initialRouteFetched.current = true;

          axiosInstance
            .get(
              `${TRACKERR_HOST}/map/polyline?rider_lng=${rider.lng}&rider_lat=${rider.lat}&dest_lng=${customer.lng}&dest_lat=${customer.lat}`
            )
            .then((res) => {
              if (res.data.routes?.length) {
                routeRef.current = res.data.routes[0].geometry;
                forceUI((v) => v + 1);
              }
            });
        }

        lastFetchedRiderLocation.current = rider;
      } catch (err) {
        console.error(err);
      }
    };

    return () => ws.close();
  }, [trackingNumber]);

  // -------------------------
  // ANIMATION ENGINE (unchanged)
  // -------------------------
  useEffect(() => {
    const animateLoop = () => {
      requestAnimationFrame(animateLoop);

      const next = riderBufferRef.current.shift();
      if (!next) return;

      const start = currentPosRef.current || next;

      const duration = 900;
      const startTime = performance.now();

      const step = (t: number) => {
        const p = Math.min((t - startTime) / duration, 1);

        const pos = {
          lng: start.lng + (next.lng - start.lng) * p,
          lat: start.lat + (next.lat - start.lat) * p,
        };

        currentPosRef.current = pos;
        setRiderCoord(pos);

        if (p < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    animateLoop();
  }, []);

  // -------------------------
  // BEARING
  // -------------------------
  useEffect(() => {
    if (!currentPosRef.current || !lastFetchedRiderLocation.current) return;

    const start = currentPosRef.current;
    const end = lastFetchedRiderLocation.current;

    const d = Math.hypot(end.lng - start.lng, end.lat - start.lat);

    if (d > 0.00001) {
      setBearing(calculateBearing(start, end));
    }
  }, [riderCoord]);

  const destination =
    routeRef.current?.coordinates?.length > 0
      ? routeRef.current.coordinates[routeRef.current.coordinates.length - 1]
      : null;

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl relative">

      {etaMinutes && (
        <div className="absolute top-4 left-4 z-10 bg-black/70 text-white px-3 py-2 rounded-xl text-sm">
          ETA: {etaMinutes} min
        </div>
      )}

      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: 8.6753, latitude: 9.082, zoom: 10 }}
        ref={mapRef}
        mapStyle={UBER_MAP_STYLE}
      >

        {routeRef.current?.coordinates && (
          <Source id="route" type="geojson" data={routeRef.current}>
            <Layer
              id="route-casing"
              type="line"
              paint={{ "line-color": "#0A2F5C", "line-width": 10 }}
            />
            <Layer
              id="route-line"
              type="line"
              paint={{ "line-color": "#276EF1", "line-width": 5 }}
            />
          </Source>
        )}

        {destination && (
          <Marker longitude={destination[0]} latitude={destination[1]}>
            <div className="relative flex items-center justify-center">
              <div className="absolute h-10 w-10 bg-blue-500 opacity-30 rounded-full animate-ping" />
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-xl" />
            </div>
          </Marker>
        )}

        {riderCoord && (
          <Marker longitude={riderCoord.lng} latitude={riderCoord.lat}>
            <div
              className="w-8 h-8 bg-orange-600 text-white flex items-center justify-center rounded-full"
              style={{ transform: `rotate(${bearing}deg)` }}
            >
              ▲
            </div>
          </Marker>
        )}

      </Map>
    </div>
  );
}