import React, { useState } from "react";
import axios from "axios";

interface TrackingData {
	id: number;
	parcel_number: string;
	date_of_purchase: string;
	delivery_date: string;
	shipping_address: string;
	latitude: string | null;
	longitude: string | null;
	destination_lat: string;
	destination_lng: string;
	rider_email: string | null;
	realtime_location: string | null;
	country: string;
	product_name: string;
	quantity: number;
	status: string;
	vendor: string;
	rider: string | null;
}

const UserInfo: React.FC = () => {
	const [trackingNumber, setTrackingNumber] = useState<string>("");
	const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchTrackingDetails = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`http://54.161.253.204:3000/api/tracking/${trackingNumber}/`
			);
			setTrackingData(response.data);
		} catch (error: any) {
			if (error.response) {
				setError("Failed to fetch tracking details");
			} else if (error.request) {
				setError(
					"Network error occurred. Please check your internet connection."
				);
			} else {
				setError(error.message);
			}
			console.error("Error fetching tracking details:", error);
		}
		setLoading(false);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTrackingNumber(event.target.value);
	};

	const handleKeyPress = async (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === "Enter") {
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
