import { useState } from 'react';
import axios from 'axios';
import { TrackingData } from '../../types/types';

/**
 * Fetch tracking details for a given tracking number.
 *
 * @return {void}
 */
const UserInfo: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTrackingDetails = async () => {
    console.log('Fetching tracking details for:', trackingNumber);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://trackerr.live/api/v1/trackings/realtime/?parcel_number=${trackingNumber}/`
      );
      console.log('Tracking details fetched successfully:', response.data);
      setTrackingData(response.data);
    } catch (error: any) {
      console.error('Error fetching tracking details:', error);
      if (error.response) {
        setError('Failed to fetch tracking details');
      } else if (error.request) {
        setError(
          'Network error occurred. Please check your internet connection.'
        );
      } else {
        setError(error.message);
      }
    }
    setLoading(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value changed:', event.target.value);
    setTrackingNumber(event.target.value);
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
      setError(null); // Clear previous errors
      await fetchTrackingDetails();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter tracking number and press Enter"
        value={trackingNumber}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {trackingData && (
        <div>
          <h2>Tracking Details</h2>
          <p>ID: {trackingData.id}</p>
          <p>Parcel Number: {trackingData.parcel_number}</p>
          <p>Date of Purchase: {trackingData.date_of_purchase}</p>
          <p>Delivery Date: {trackingData.delivery_date}</p>
          <p>Shipping Address: {trackingData.shipping_address}</p>
          <p>Latitude: {trackingData.latitude}</p>
          <p>Longitude: {trackingData.longitude}</p>
          <p>Destination Latitude: {trackingData.destination_lat}</p>
          <p>Destination Longitude: {trackingData.destination_lng}</p>
          <p>Country: {trackingData.country}</p>
          <p>Product Name: {trackingData.product_name}</p>
          <p>Quantity: {trackingData.quantity}</p>
          <p>Status: {trackingData.status}</p>
          <p>Vendor: {trackingData.vendor}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
