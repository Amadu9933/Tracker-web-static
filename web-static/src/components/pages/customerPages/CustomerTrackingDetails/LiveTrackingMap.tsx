import { useRef, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";


const TRACKERR_WS_HOST = import.meta.env.VITE_TRACKERR_WS_HOST; // Use environment variable for base URL

const libraries: (
  "drawing" | "geometry" | "places" | "visualization"
)[] = ["geometry"];

const containerStyle = {
  width: "100%",
  height: "500px",
};


const center = { lat: 9.05785, lng: 7.49508 };

const LiveTrackingMap = ({ trackingNumber }: { trackingNumber: string }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  type LatLng = { lat: number; lng: number };
  const prevOriginRef = useRef<LatLng | null>(null);
  const riderMarkerRef = useRef<google.maps.Marker | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const headingRef = useRef<number>(0);


  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [vendorPosition, setVendorPosition] = useState("");
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

const getBikeIcon = (heading: number): google.maps.Symbol => ({
  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, // Use this first to test
  scale: 5,
  rotation: heading,
  fillColor: "#ff5722",
  fillOpacity: 1,
  strokeWeight: 1,
  anchor: new window.google.maps.Point(0, 0),
});


const animateMove = (
  from: LatLng,
  to: LatLng,
  marker: google.maps.Marker,
  duration = 1000 // ms
) => {
  const startTime = performance.now();
  const heading = window.google.maps.geometry.spherical.computeHeading(from, to);

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const currentLat = from.lat + (to.lat - from.lat) * progress;
    const currentLng = from.lng + (to.lng - from.lng) * progress;

    marker.setPosition({ lat: currentLat, lng: currentLng });
    marker.setIcon(getBikeIcon(heading));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      marker.setPosition(to);
    }
  };

  requestAnimationFrame(step);
};


  useEffect(() => {
    const socket = new WebSocket(`${TRACKERR_WS_HOST}/ws/tracking/`);
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
        setVendorPosition(location.parcel.status);

        const customer = {
          lat: parseFloat(location_data.customer.lat),
          lng: parseFloat(location_data.customer.lng),
        };
        setDestination(customer);

        if (["returned", "delivered", "pending"].includes(location.parcel.status)) {
          setOrigin({
            lat: parseFloat(location_data.business_owner.lat),
            lng: parseFloat(location_data.business_owner.lng),
          });
        } else {
          const riderLat = parseFloat(location_data.rider.lat);
          const riderLng = parseFloat(location_data.rider.lng);

          fetch(`https://roads.googleapis.com/v1/snapToRoads?path=${riderLat},${riderLng}&key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.snappedPoints && data.snappedPoints.length > 0) {
                const snapped = data.snappedPoints[0].location;
                setOrigin({ lat: snapped.latitude, lng: snapped.longitude });
              }
            });
        }
      }
    };

    socket.onerror = (error) => console.error("WebSocket error:", error);
    return () => socket.close();
  }, []);

  useEffect(() => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          }
        }
      );
    }
  }, [origin, destination]);

  useEffect(() => {
    if (!mapRef.current || !origin || vendorPosition !== "in transit") return;
let heading = headingRef.current;

if (
  prevOriginRef.current &&
  (prevOriginRef.current.lat !== origin.lat || prevOriginRef.current.lng !== origin.lng)
) {
  heading = window.google.maps.geometry.spherical.computeHeading(prevOriginRef.current, origin);
  headingRef.current = heading;
}

    if (!riderMarkerRef.current) {
      riderMarkerRef.current = new window.google.maps.Marker({
        map: mapRef.current,
        position: origin,
        icon: getBikeIcon(heading),
      });
    } else {
      if (prevOriginRef.current) {
        animateMove(prevOriginRef.current, origin, riderMarkerRef.current);
      } else {
        riderMarkerRef.current.setPosition(origin);
        console.log(heading)
        riderMarkerRef.current.setIcon(getBikeIcon(heading));
        // riderMarkerRef.current.setIcon(getBikeIcon(headingRef.current));

      }
    }
    prevOriginRef.current = origin;
  }, [origin, vendorPosition, isLoaded]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={(map) => {(mapRef.current = map)}}
      options={{
        gestureHandling: "greedy",
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      }}
    >
      {destination && (
        <Marker
          position={destination}
          icon={{
            url: "/public/destination.png",
            scaledSize: new window.google.maps.Size(24, 56),
            anchor: new window.google.maps.Point(32, 96),
          }}
          animation={window.google.maps.Animation.BOUNCE}
        />
      )}
      {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}
    </GoogleMap>
  );
};

export default LiveTrackingMap;