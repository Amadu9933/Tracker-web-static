import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const LiveTrackingMap = ({ trackingNumber }: { trackingNumber: string }) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const [origin, setOrigin] = useState<any>(null);
    const [destination, setDestination] = useState<any>(null);

    // Load Google Maps JS API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
    });

    useEffect(() => {
        if (!trackingNumber) return;
        const socket = new WebSocket('wss://trackerr.live/ws/tracking/');
        socket.onopen = () => {
            if (trackingNumber) {
                socket.send(JSON.stringify({ parcel_number: trackingNumber }));
            }
        };
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const location = data.location_data;
            if (location) {
                const location_data = location.locations;
                if (["returned", "delivered", "pending"].includes(location.parcel.status)) {
                    // Use business_owner as origin, customer as destination
                    const business_owner_lat = parseFloat(location_data.business_owner.lat);
                    const business_owner_lng = parseFloat(location_data.business_owner.lng);
                    const customer_lat = parseFloat(location_data.customer.lat);
                    const customer_lng = parseFloat(location_data.customer.lng);
                    setOrigin({ lat: business_owner_lat, lng: business_owner_lng });
                    setDestination({ lat: customer_lat, lng: customer_lng });
                } else {
                    // Use rider as origin, customer as destination
                    const rider_lat = parseFloat(location_data.rider.lat);
                    const rider_lng = parseFloat(location_data.rider.lng);
                    const customer_lat = parseFloat(location_data.customer.lat);
                    const customer_lng = parseFloat(location_data.customer.lng);
                    setDestination({ lat: customer_lat, lng: customer_lng });
                    // Snap to road
                    fetch(
                        `https://roads.googleapis.com/v1/snapToRoads?path=${rider_lat},${rider_lng}&key=${apiKey}`
                    )
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.snappedPoints && data.snappedPoints.length > 0) {
                                const snapped = data.snappedPoints[0].location;
                                setOrigin({ lat: snapped.latitude, lng: snapped.longitude });
                            } else {
                                setOrigin({ lat: rider_lat, lng: rider_lng });
                            }
                        })
                        .catch(() => {
                            setOrigin({ lat: rider_lat, lng: rider_lng });
                        });
                }
            }
        };
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        return () => {
            socket.close();
        };
    }, [trackingNumber, apiKey]);

    if (!isLoaded) return <div>Loading map...</div>;
    if (!origin || !destination) return <div>Loading location...</div>;

    return (
        <div style={{ backgroundColor: '#f0f0f0', height: '500px', width: '100%' }}>
            <GoogleMap
                mapContainerStyle={{ height: '100%', width: '100%' }}
                center={origin}
                zoom={14}
                options={{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                }}
            >
                <Marker position={origin} label="Origin" />
                <Marker position={destination} label="Destination" />
            </GoogleMap>
        </div>
    );
};

export default LiveTrackingMap;