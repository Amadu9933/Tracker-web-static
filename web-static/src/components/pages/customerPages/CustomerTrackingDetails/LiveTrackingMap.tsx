import { useEffect, useRef, useState } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";
import { useParams } from "react-router-dom";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function LiveTrackingMap() {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const [trackingData, setTrackingData] = useState<any>(null);
  const [fullRouteGeoJSON, setFullRouteGeoJSON] = useState<any>(null);
  const [animatedRoute, setAnimatedRoute] = useState<any>(null);
  const [riderCoord, setRiderCoord] = useState<{ lng: number; lat: number } | null>(null);
  const [bearing, setBearing] = useState<number>(0); // Dynamic navigation arrow angle

  const mapRef = useRef<any | null>(null);
  const hasFlownRef = useRef(false);
  const initialRouteFetched = useRef(false);
  const totalRecalculationsMade = useRef<number>(0);

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
  const DEVIATION_THRESHOLD = 0.0005;
  const VITE_TRACKERR_WS_HOST = import.meta.env.VITE_TRACKERR_WS_HOST;

  const lastFetchedRiderLocation = useRef<{ lng: number; lat: number } | null>(null);
  const lastRouteFetchTime = useRef<number>(0);

  // Clean, premium minimalist navigation night style
  const UBER_MAP_STYLE = "mapbox://styles/mapbox/navigation-night-v1";
  // const UBER_MAP_STYLE_NIGHT = "mapbox://styles/mapbox/navigation-day-v1";

  // Helper: Mathematical formula to calculate the compass bearing between two coordinates
  const calculateBearing = (start: { lng: number; lat: number }, end: { lng: number; lat: number }) => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    const toDegrees = (rad: number) => (rad * 180) / Math.PI;

    const startLng = toRadians(start.lng);
    const startLat = toRadians(start.lat);
    const endLng = toRadians(end.lng);
    const endLat = toRadians(end.lat);

    const dLng = endLng - startLng;

    const y = Math.sin(dLng) * Math.cos(endLat);
    const x =
      Math.cos(startLat) * Math.sin(endLat) -
      Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);

    const brng = toDegrees(Math.atan2(y, x));
    return (brng + 360) % 360; // Returns compass degrees (0-360)
  };

  // 1. WebSocket Stream Listener
  useEffect(() => {
    const ws = new WebSocket(`${VITE_TRACKERR_WS_HOST}/ws/tracking/`);

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket");
      ws.send(JSON.stringify({ parcel_number: trackingNumber }));
    };

    ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        const locations = data?.location_data?.locations;

        if (!locations) return;

        const rider = locations.rider || locations.business_owner;
        const customer = locations.customer;

        setTrackingData({ ...locations });
        
        if (!riderCoord) {
          setRiderCoord(rider);
        }

        // Smoothly adjust camera
        if (mapRef.current) {
          if (!hasFlownRef.current) {
            hasFlownRef.current = true;
            mapRef.current.flyTo({ center: [rider.lng, rider.lat], zoom: 15, pitch: 45 });
          } else {
            mapRef.current.easeTo({ center: [rider.lng, rider.lat], duration: 1000 });
          }
        }

        // INITIAL ROUTE FETCH
        if (!initialRouteFetched.current) {
          initialRouteFetched.current = true;
          lastFetchedRiderLocation.current = rider;
          lastRouteFetchTime.current = Date.now();

          const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${rider.lng},${rider.lat};${customer.lng},${customer.lat}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;
          const res = await fetch(url);
          const json = await res.json();
          if (json.routes?.length) {
            setFullRouteGeoJSON(json.routes[0].geometry);
            setAnimatedRoute(json.routes[0].geometry);
          }
          return; 
        }

        // COST OPTIMIZATION GATEWAY
        const now = Date.now();
        const TIME_THROTTLE = 30000; 
        const distanceFromCustomer = Math.hypot(rider.lng - customer.lng, rider.lat - customer.lat);
        const NEAR_DESTINATION_THRESHOLD = 0.0015; 
        const MAX_ALLOWED_RECALCULATIONS = 5;

        if (
          now - lastRouteFetchTime.current > TIME_THROTTLE && 
          distanceFromCustomer > NEAR_DESTINATION_THRESHOLD &&
          totalRecalculationsMade.current < MAX_ALLOWED_RECALCULATIONS
        ) {
          if (lastFetchedRiderLocation.current) {
            const movementFromLastFetch = Math.hypot(
              rider.lng - lastFetchedRiderLocation.current.lng, 
              rider.lat - lastFetchedRiderLocation.current.lat
            );

            if (movementFromLastFetch > 0.001) {
              if (fullRouteGeoJSON && distanceToRoute(fullRouteGeoJSON, rider) > DEVIATION_THRESHOLD) {
                totalRecalculationsMade.current += 1;
                lastRouteFetchTime.current = now;
                lastFetchedRiderLocation.current = rider;

                const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${rider.lng},${rider.lat};${customer.lng},${customer.lat}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;
                const res = await fetch(url);
                const json = await res.json();
                if (json.routes?.length) {
                  setFullRouteGeoJSON(json.routes[0].geometry);
                  setAnimatedRoute(json.routes[0].geometry);
                  console.log(`🔄 Wallet Protected: Recalculation ${totalRecalculationsMade.current}/${MAX_ALLOWED_RECALCULATIONS}`);
                }
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to parse WebSocket data", err);
      }
    };

    ws.onclose = () => console.log("❌ WebSocket closed");
    return () => ws.close();
  }, [trackingNumber, fullRouteGeoJSON]);

  var center = { longitude: 8.6753, latitude: 9.0820, zoom: 10 };

  // 2. Interpolation and Alignment Engine
  useEffect(() => {
    if (!trackingData?.rider || !riderCoord) return;

    const start = riderCoord;
    const end = trackingData.rider;
    const duration = 1000; 
    const startTime = performance.now();

    // ─── BEARING (HEADING) LOGIC ENGINE ───
    const distanceMoved = Math.hypot(end.lng - start.lng, end.lat - start.lat);

    if (distanceMoved > 0.00001) {
      // Scenario A: Rider is moving -> Point along the direction of physical travel
      const moveBearing = calculateBearing(start, end);
      setBearing(moveBearing);
    } else if (animatedRoute?.coordinates && animatedRoute.coordinates.length > 1) {
      // Scenario B: Rider is stationary -> Look-ahead down the polyline first street nodes
      const currentRouteCoords = animatedRoute.coordinates;
      const currentPosition = { lng: start.lng, lat: start.lat };
      const nextWayPoint = { lng: currentRouteCoords[1][0], lat: currentRouteCoords[1][1] };
      
      const polylineBearing = calculateBearing(currentPosition, nextWayPoint);
      setBearing(polylineBearing);
    }

    const animateMarker = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const lng = start.lng + (end.lng - start.lng) * progress;
      const lat = start.lat + (end.lat - start.lat) * progress;
      
      setRiderCoord({ lng, lat });

      if (fullRouteGeoJSON) {
        const newRoute = trimRouteFromRider(fullRouteGeoJSON, { lng, lat });
        setAnimatedRoute(newRoute);
      }

      if (progress < 1) {
        requestAnimationFrame(animateMarker);
      }
    };

    requestAnimationFrame(animateMarker);
  }, [trackingData?.rider, animatedRoute?.coordinates]);

  const trimRouteFromRider = (routeGeoJSON: any, rider: { lng: number; lat: number }) => {
    if (!routeGeoJSON?.coordinates) return routeGeoJSON;
    const coords = routeGeoJSON.coordinates;
    let nearestIndex = 0;
    let minDist = Infinity;
    for (let i = 0; i < coords.length; i++) {
      const [lng, lat] = coords[i];
      const dist = Math.hypot(lng - rider.lng, lat - rider.lat);
      if (dist < minDist) {
        minDist = dist;
        nearestIndex = i;
      }
    }
    return { type: "LineString", coordinates: coords.slice(nearestIndex) };
  };

  const distanceToRoute = (route: any, rider: { lng: number; lat: number }) => {
    if (!route?.coordinates) return Infinity;
    let minDist = Infinity;
    for (const [lng, lat] of route.coordinates) {
      const dist = Math.hypot(lng - rider.lng, lat - rider.lat);
      if (dist < minDist) minDist = dist;
    }
    return minDist;
  };

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl relative">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={center}
        ref={mapRef}
        mapStyle={UBER_MAP_STYLE}
      >
        {/* Render Layer Casing underneath for crisp visibility */}
        {animatedRoute && animatedRoute.coordinates && animatedRoute.coordinates.length > 0 && (
          <Source id="uber-route-source" type="geojson" data={animatedRoute}>
            {/* Outer Casing/Glow */}
            <Layer
              id="route-casing"
              type="line"
              layout={{
                "line-join": "round",
                "line-cap": "round"
              }}
              paint={{
                "line-color": "#0A2F5C", // Premium dark casing outline background
                "line-width": 10,
              }}
            />
            {/* Inner Glowing Uber Neon Blue Line */}
            <Layer
              id="route-layer"
              type="line"
              layout={{
                "line-join": "round",
                "line-cap": "round"
              }}
              paint={{ 
                "line-color": "#276EF1", // Signature Uber brand neon tracker blue
                "line-width": 5,
              }}
            />
          </Source>
        )}

        {/* Customer Destination Marker with Circle Glow */}
        {trackingData?.customer && (
          <Marker longitude={trackingData.customer.lng} latitude={trackingData.customer.lat} anchor="bottom">
            <div className="relative flex items-center justify-center h-16 w-16">
              <div className="absolute h-8 w-8 rounded-full bg-blue-500 opacity-40 animate-marker-glow"></div>
              <div className="absolute h-4 w-4 rounded-full bg-blue-500/30 border border-blue-400"></div>
              <div className="relative z-10 flex flex-col items-center">
                {/* <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg mb-1 border border-slate-700 whitespace-nowrap">
                  Destination
                </div> */}
                <div className="w-4 h-4 bg-black rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </Marker>
        )}

        {/* Rider / Driver Default Navigation Arrow Marker */}
        {riderCoord && (
          <Marker longitude={riderCoord.lng} latitude={riderCoord.lat} anchor="center">
            <div className="flex items-center justify-center h-10 w-10">
              <div className="absolute h-8 w-8 bg-black/10 rounded-full blur-sm"></div>
              <div 
                className="relative flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-xl text-white transition-transform duration-200"
                style={{ transform: `rotate(${bearing}deg)` }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -translate-y-[1px]">
                  <path d="M12 2L2 22l10-6 10 6L12 2z" />
                </svg>
              </div>
            </div>
          </Marker>
        )}
      </Map>
    </div>
  );
}