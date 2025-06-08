import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';

/**
 * Props for LiveTrackingMap.
 */
interface LiveTrackingMapProps {
    trackingNumber: string;
    /**
     * The destination coordinates (lat/lng) for the parcel.
     */
    destination: { lat: number; lng: number };
    /**
     * The initial origin coordinates (lat/lng) for the parcel/rider.
     */
    initialOrigin: { lat: number; lng: number };
    /**
     * If true, disables map interactivity (for read-only view).
     */
    readOnly?: boolean;
}

/**
 * Real-time Google Maps tracking component for parcels/riders.
 * Connects to backend WebSocket for live updates, displays origin/destination, and directions.
 *
 * @param {LiveTrackingMapProps} props
 */
const LiveTrackingMap: React.FC<LiveTrackingMapProps> = ({
    trackingNumber,
    destination,
    initialOrigin,
    readOnly = false,
}) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const [origin, setOrigin] = useState(initialOrigin);
    const [isDelivered, setIsDelivered] = useState(false);
    const [routePath, setRoutePath] = useState<Array<{ lat: number; lng: number }>>([]);
    const wsRef = useRef<WebSocket | null>(null);

    // Google Maps API loader
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries: ['places'],
    });

    // Snap to road using Google Roads API
    const snapToRoad = useCallback(async (lat: number, lng: number) => {
        try {
            const res = await fetch(
                `https://roads.googleapis.com/v1/snapToRoads?path=${lat},${lng}&interpolate=true&key=${apiKey}`
            );
            const data = await res.json();
            if (data.snappedPoints && data.snappedPoints.length > 0) {
                return {
                    lat: data.snappedPoints[0].location.latitude,
                    lng: data.snappedPoints[0].location.longitude,
                };
            }
        } catch (e) {
            // fallback to original
        }
        return { lat, lng };
    }, [apiKey]);

    // Fetch directions from Google Directions API
    const fetchDirections = useCallback(
        async (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => {
            try {
                const res = await fetch(
                    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=driving&key=${apiKey}`
                );
                const data = await res.json();
                if (data.routes && data.routes.length > 0) {
                    const points = decodePolyline(data.routes[0].overview_polyline.points);
                    setRoutePath(points);
                } else {
                    setRoutePath([]);
                }
            } catch {
                setRoutePath([]);
            }
        },
        [apiKey]
    );

    // Polyline decoder (Google encoded polyline algorithm)
    function decodePolyline(encoded: string): Array<{ lat: number; lng: number }> {
        let points = [];
        let index = 0,
            lat = 0,
            lng = 0;
        while (index < encoded.length) {
            let b,
                shift = 0,
                result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlat = (result & 1 ? ~(result >> 1) : result >> 1);
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlng = (result & 1 ? ~(result >> 1) : result >> 1);
            lng += dlng;
            points.push({ lat: lat / 1e5, lng: lng / 1e5 });
        }
        return points;
    }

    // WebSocket connection for real-time updates
    useEffect(() => {
        if (!trackingNumber) return;
        const ws = new WebSocket(`wss://trackerr.live/ws/track/${trackingNumber}`);
        wsRef.current = ws;
        ws.onmessage = async (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.status === 'delivered') {
                    setIsDelivered(true);
                    setOrigin(data.rider_location || initialOrigin);
                } else if (data.rider_location) {
                    const snapped = await snapToRoad(
                        data.rider_location.lat,
                        data.rider_location.lng
                    );
                    setOrigin(snapped);
                }
            } catch (e) {
                // handle error
            }
        };
        ws.onerror = () => {
            // Optionally handle error
        };
        return () => {
            ws.close();
        };
    }, [trackingNumber, initialOrigin, snapToRoad]);

    // Fetch directions when origin or destination changes
    useEffect(() => {
        if (origin && destination) {
            fetchDirections(origin, destination);
        }
    }, [origin, destination, fetchDirections]);

    if (!apiKey) return <div className="text-red-500">Google Maps API key missing.</div>;
    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <div className="bg-gray-100 rounded-lg shadow w-full h-[500px] relative">
            <GoogleMap
                mapContainerStyle={{ height: '100%', width: '100%' }}
                center={origin}
                zoom={14}
                options={{
                    gestureHandling: readOnly ? 'none' : 'greedy',
                    disableDefaultUI: readOnly,
                }}
            >
                {origin && <Marker position={origin} label="Origin" />}
                {destination && <Marker position={destination} label="Destination" />}
                {routePath.length > 0 && (
                    <Polyline
                        path={routePath}
                        options={{
                            geodesic: true,
                            strokeColor: '#4285F4',
                            strokeOpacity: 1.0,
                            strokeWeight: 4,
                        }}
                    />
                )}
            </GoogleMap>
            {isDelivered && (
                <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded shadow">
                    Delivered
                </div>
            )}
        </div>
    );
};

export default LiveTrackingMap;
