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
      console.log('WS connection established');
      if (trackingNumber) {
        socket.send(JSON.stringify({ parcel_number: trackingNumber }));
      }
    };

    socket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
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

    socket.onerror = (error) => console.error("WebSocket error found:", error);
  }, []);

  useEffect(() => {
    if (!isLoaded || !origin || !destination) return;

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
          } else {
            console.error("Direction request failed due to :", status);
          }
        }
      );
    }
  }, [isLoaded, origin, destination]);

  useEffect(() => {
    if (!mapRef.current || !origin) return;
    // Remove pointer marker if status is no longer in transit
    if (vendorPosition !== "in transit") {
      if (riderMarkerRef.current) {
        riderMarkerRef.current.setMap(null); // Removes it from map
        riderMarkerRef.current = null;
      }
      return;
    }
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

  if (!isLoaded) return;

  // Map styles
  // const mapStyles = [
  //   {
  //     elementType: "geometry",
  //     stylers: [{ color: "#1d2c4d" }]
  //   },
  //   {
  //     elementType: "labels.text.fill",
  //     stylers: [{ color: "#8ec3b9" }]
  //   },
  //   {
  //     elementType: "labels.text.stroke",
  //     stylers: [{ color: "#1a3646" }]
  //   },
  //   {
  //     featureType: "administrative.country",
  //     elementType: "geometry.stroke",
  //     stylers: [{ color: "#4b6878" }]
  //   },
  //   {
  //     featureType: "administrative.land_parcel",
  //     elementType: "labels.text.fill",
  //     stylers: [{ color: "#64779e" }]
  //   },
  //   {
  //     featureType: "poi",
  //     elementType: "labels.text.fill",
  //     stylers: [{ color: "#74aee9" }]
  //   },
  //   {
  //     featureType: "poi.park",
  //     elementType: "geometry",
  //     stylers: [{ color: "#263c3f" }]
  //   },
  //   {
  //    
  //   {
  //     featureType: "road",
  //     elementType: "geometry",
  //     stylers: [{ color: "#304a7d" }]
  //   },
  //   {
  //     featureType: "road",
  //     elementType: "geometry.stroke",
  //     stylers: [{ color: "#1a2a3a" }]
  //   },
  //   {
  //     featureType: "road",
  //     elementType: "labels.text.fill",
  //     stylers: [{ color: "#98a5be" }]
  //   },
  //   {
  //     featureType: "road.highway",
  //     elementType: "geometry",
  //     stylers: [{ color: "#2c6675" }]
  //   },
  //   {
  //     featureType: "road.highway",
  //     elementType: "geometry.stroke",
  //     stylers: [{ color: "#255763" }]
  //   },
  //   {
  //     featureType: "road.highway",
  //     elementType: "labels.text.fill",
  //     stylers: [{ color: "#b0d5ce" }]
  //   },
  //   {
  //     featureType: "transit",
  //     elementType: "labels.text.fill",
  //     stylers: [{ color: "#98a5be" }]
  //   },
  //   {
  //     featureType: "transit",
  //     elementType: "labels.text.stroke",
  //     stylers: [{ color: "#1d2c4d" }]
  //   },
  //   {
  //     featureType: "transit.line",
  //     elementType: "geometry.fill",
  //     stylers: [{ color: "#283d6a" }]
  //   },
  //   {
  //     featureType: "transit.station",
  //     elementType: "geometry",
  //     stylers: [{ color: "#3a4762" }]
  //   },
  //   {
  //     featureType: "water",
  //     elementType: "geometry",
  //     stylers: [{ color: "#0e1626" }]
  //   },
  //   {
  //     featureType: "water",
  //     elementType: "labels.text.fill",
  //     stylers: [{ color: "#4e6d70" }]
  //   }
  // ];


  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={(map) => { (mapRef.current = map) }}
      options={{
        gestureHandling: "greedy",
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        // styles: mapStyles,
      }}
    >

      {['in transit'].includes(vendorPosition) && destination && (
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
      {['delivered', 'returned', 'pending'].includes(vendorPosition) && destination && (
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

      {['delivered', 'returned', 'pending'].includes(vendorPosition) && origin && (
        <Marker
          position={origin}
          icon={{
            url: "/public/office.png",
            scaledSize: new window.google.maps.Size(24, 56),
            anchor: new window.google.maps.Point(32, 96),
          }}
        />
      )}
      {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true, polylineOptions: { strokeColor: "#4285F4", strokeOpacity: 0.6, strokeWeight: 5 } }} />}
    </GoogleMap>
  );
};

export default LiveTrackingMap;