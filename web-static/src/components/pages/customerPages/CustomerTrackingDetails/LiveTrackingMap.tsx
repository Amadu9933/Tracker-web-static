import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { APIProvider,
  latLngEquals,
  Map,
  Marker,
  useMap, } from "@vis.gl/react-google-maps";
import { set } from "react-hook-form";
  
//   '@react-google-maps/api';

const LiveTrackingMap = ({ trackingNumber }: { trackingNumber: string }) => {
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
type LatLng = { lat: number; lng: number };

const Directions = ({ origin, destination }: {  origin: LatLng | null; destination: LatLng | null;}) => {
  const map = useMap();
  const rendererRef = useRef<google.maps.DirectionsRenderer>();


  
  useEffect(() => {
    if (!map || !origin || !destination) return;

    const directionsService = new google.maps.DirectionsService();
    if (!rendererRef.current) {
      rendererRef.current = new google.maps.DirectionsRenderer({
        map,
        suppressMarkers: true,
       
      });
    } else {
      rendererRef.current.setMap(map);
    }

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && rendererRef.current) {
          rendererRef.current.setDirections(result);
        }
      }
    );

    return () => {
      if (rendererRef.current) {
        rendererRef.current.setMap(null);
      }
    };
  }, [map, origin, destination]);

  return null;
};


const MapApp = () => {

  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [vendorPosition, setVendorPosition] = useState('');

  // Retrieve the tracking submitted by the user
  useEffect(() => {
    // use a click event listener to get the tracking number once the view live button is clicked
    // const trackingNumber = "HA485039588AH"; // Example tracking number, replace with actual input
    const socket = new WebSocket("wss://trackerr.live/ws/tracking/");
    socket.onopen = () => {
      console.log("WebSocket connection established");
      if (trackingNumber) {
        socket.send(JSON.stringify({ parcel_number: trackingNumber }));
        console.log("Tracking number sent:", trackingNumber);
      }
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data:", data);
      const location = data.location_data;
      if (location) {
        const location_data = location.locations;
        setVendorPosition(location.parcel.status)
        
        if (
          ["returned", "delivered", "pending"].includes(location.parcel.status)
        ) {
          console.log("Parcel status:", location.parcel.status);
          // Origin and Destination are set based on the location data
          // set origin and destination based on the received data
          var business_owner_lat = parseFloat(location_data.business_owner.lat);
          var business_owner_lng = parseFloat(location_data.business_owner.lng);

          var customer_lat = parseFloat(location_data.customer.lat);
          var customer_lng = parseFloat(location_data.customer.lng);

          setOrigin({
            lat: business_owner_lat,
            lng: business_owner_lng,
          });

          setDestination({
            lat: customer_lat,
            lng: customer_lng,
          });
        } else {
          // set origin and destination based on the received data
          var rider_lat = parseFloat(location_data.rider.lat);
          var rider_lng = parseFloat(location_data.rider.lng);

          var customer_lat = parseFloat(location_data.customer.lat);
          var customer_lng = parseFloat(location_data.customer.lng);

          setDestination({ lat: customer_lat, lng: customer_lng });
          // Assuming data.location.lat and data.location.long are available

          fetch(
            `https://roads.googleapis.com/v1/snapToRoads?path=${rider_lat},${rider_lng}&key=${apiKey}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.snappedPoints && data.snappedPoints.length > 0) {
                const snapped = data.snappedPoints[0].location;
                setOrigin({ lat: snapped.latitude, lng: snapped.longitude });
              }
            });

          // setOrigin({
          //   lat: rider_lat,
          //   lng: rider_lng,
          // });
          console.log("location updated:");
        }
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);
  // create a websocket connection to the server and send the tracking number
  // Set the destination to a specific location from the api
  // sent the origin to the drivers location

  // Example: You can update origin/destination with setOrigin/setDestination
  useEffect(() => {
}, [vendorPosition]);

  return (
    <div style={{ backgroundColor: '#f0f0f0', height: '500px', width: '100%' }}>
    <APIProvider apiKey={`${apiKey}`}>
      {/* <div
        style={{
          backgroundColor: "#f0f0f0",
          height: "500px",
          width: "500px",
        }}
        className="App"
      > */}
        <Map
          defaultZoom={5}
          defaultCenter={{ lat: 9.05785, lng: 7.49508 }} // Centered on Nigeria
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          mapTypeControl={false}
          scaleControl={false}
          streetViewControl={false}
          rotateControl={false}
          fullscreenControl={false}
          gestureHandling="greedy"
        >
            {origin && <Marker position={origin} label="" icon={{url: ["returned", "delivered", "pending"].includes(vendorPosition) ? "https://img.icons8.com/3d-fluency/48/client-company.png" :"https://img.icons8.com/color/48/motorcycle-delivery-single-box.png"}}/>}
            {destination && <Marker position={destination} label="" icon={{url: "https://img.icons8.com/color/48/marker.png"}}/>}
            {origin && destination && <Directions origin={origin} destination={destination} />}
        </Map>
      {/* </div> */}
    </APIProvider>
    </div>
  );
};
 return <MapApp />;
}

export default LiveTrackingMap;