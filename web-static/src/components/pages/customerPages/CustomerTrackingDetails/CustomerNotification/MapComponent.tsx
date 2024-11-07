import React from 'react';
import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';

/**
 * Renders a map component using the Google Maps API.
 *
 * @return {ReactElement} The rendered map component.
 */
const MapComponent: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  console.log('API Key:', apiKey);

  return (
    <div className="flex justify-center">
      {apiKey ? (
        <APIProvider apiKey={apiKey}>
          <GoogleMap
            style={{ width: '100%', height: '100vh' }}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            gestureHandling="greedy"
            disableDefaultUI={true}
          />
        </APIProvider>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default MapComponent;
