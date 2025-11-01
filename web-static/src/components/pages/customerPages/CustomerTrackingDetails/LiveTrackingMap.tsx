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

  const mapRef = useRef<any | null>(null);
  const hasFlownRef = useRef(false);
  const initialRouteFetched = useRef(false);
  const previousRiderCoord = useRef<{ lng: number; lat: number } | null>(null);

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
  const DEVIATION_THRESHOLD = 0.0005;

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const ws = new WebSocket(`${VITE_BASE_URL}/ws/tracking/`);

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket");
      ws.send(JSON.stringify({ parcel_number: trackingNumber }));
    };

    ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        const locations = data?.location_data?.locations;

        console.log("WebSocket message received:", data);
        if (!locations) return;

        const rider = locations.rider || locations.business_owner;
        const customer = locations.customer;

        setTrackingData({ ...locations });
        setRiderCoord(prev => prev ? prev : rider);

        // Initial fly to rider
        if (!hasFlownRef.current && mapRef.current) {
          hasFlownRef.current = true;
          mapRef.current.flyTo({ center: [rider.lng, rider.lat], zoom: 14 });
        }

        // Initial route fetch
        if (!initialRouteFetched.current) {
          initialRouteFetched.current = true;
          const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${rider.lng},${rider.lat};${customer.lng},${customer.lat}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;
          const res = await fetch(url);
          const json = await res.json();
          console.log("Initial route fetch:", json);
          if (json.routes?.length) {
            setFullRouteGeoJSON(json.routes[0].geometry);
            setAnimatedRoute(json.routes[0].geometry);
          }
        }

        // Re-fetch route if rider deviates
        if (fullRouteGeoJSON && distanceToRoute(fullRouteGeoJSON, rider) > DEVIATION_THRESHOLD) {
          const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${rider.lng},${rider.lat};${customer.lng},${customer.lat}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;
          const res = await fetch(url);
          const json = await res.json();
          if (json.routes?.length) {
            setFullRouteGeoJSON(json.routes[0].geometry);
            setAnimatedRoute(json.routes[0].geometry);
            console.log("🔄 Route re-fetched due to deviation");
          }
        }

        previousRiderCoord.current = rider;

      } catch (err) {
        console.error("Failed to parse WebSocket data", err);
      }
    };

    ws.onclose = () => console.log("❌ WebSocket closed");
    return () => ws.close();
  }, [trackingNumber, fullRouteGeoJSON]);

  // Animate rider and map smoothly
  useEffect(() => {
    if (!riderCoord || !trackingData?.rider) return;

    const start = riderCoord;
    const end = trackingData.rider;
    const steps = 30;
    let step = 0;

    const animateMarker = () => {
      step++;
      const lng = start.lng + ((end.lng - start.lng) * step) / steps;
      const lat = start.lat + ((end.lat - start.lat) * step) / steps;
      setRiderCoord({ lng, lat });

      if (mapRef.current) {
        mapRef.current.easeTo({ center: [lng, lat], duration: 1000, easing: (t: any) => t });
      }

      if (fullRouteGeoJSON) {
        const newRoute = trimRouteFromRider(fullRouteGeoJSON, { lng, lat });
        setAnimatedRoute(newRoute);
      }

      if (step < steps) requestAnimationFrame(animateMarker);
    };

    animateMarker();
  }, [trackingData?.rider]);

  // Helper: Trim route from rider's current position
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

  // Helper: Compute distance to route
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
    <div className="w-full h-[600px]">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: 3.3792, latitude: 6.5244, zoom: 11 }}
        ref={mapRef}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {/* Route */}
        {animatedRoute && (
          <Source id="route" type="geojson" data={animatedRoute}>
            <Layer
              id="route-layer"
              type="line"
              paint={{ "line-color": "#0074D9", "line-width": 6 }}
            />
          </Source>
        )}

        {/* Customer */}
        {trackingData?.customer && (
          <Marker longitude={trackingData.customer.lng} latitude={trackingData.customer.lat} color="blue" />
        )}

        {/* Rider */}
        {riderCoord && (
          <Marker longitude={riderCoord.lng} latitude={riderCoord.lat} color="orange"/>
        )}
        
      </Map>
    </div>
  );
}