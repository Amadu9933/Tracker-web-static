// src/types/index.ts

export interface MyButtonProps {
  onClick: () => void; // Function to be executed on button click
  label: string;
  state?: 'Primary' | 'Secondary';
  size?: 'Small' | 'Medium' | 'Large' | 'mobile'; // Button size, defaults to 'Medium'
  background?: string; // Background color of the button, defaults to '#FF833C'
}

export interface Location {
  latitude: string | null;
  longitude: string | null;
}

export interface Destination {
  destination_lat: string;
  destination_lng: string;
}

export interface TrackingData extends Location, Destination {
  id: number;
  parcel_number: string;
  date_of_purchase: string;
  delivery_date: string;
  shipping_address: string;
  rider_email: string | null;
  realtime_location: string | null;
  country: string;
  product_name: string;
  quantity: number;
  status: string;
  vendor: string;
  rider: string | null;
}
