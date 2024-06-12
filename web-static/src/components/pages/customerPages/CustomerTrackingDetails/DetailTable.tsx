import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailTable: React.FC = () => {
	const { trackingNumber } = useParams<{ trackingNumber: string }>();
	const [trackingData, setTrackingData] = useState<any | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTrackingDetails = async () => {
			try {
				const response = await axios.get(
					`http://172.232.4.147:8000/api/v1/tracking/${trackingNumber}/`
				);

				// Filter the tracking data to include only the desired fields
				const filteredData = {
					"Parcel number": response.data.parcel_number,
					"Date of purchase": response.data.date_of_purchase,
					"Estimated delivery date": response.data.delivery_date,
					"Shipping address": response.data.shipping_address,
					Vendor: response.data.vendor,
					Status: response.data.status,
				};
				setTrackingData(filteredData);
				setError(null);
			} catch (error: any) {
				console.error("Error fetching tracking details:", error);
				setError(error.message || "An unknown error occurred");
			}
		};
		fetchTrackingDetails();
	}, [trackingNumber]);

	if (error) {
		return <p className="text-2xl">Error: {error}</p>;
	}

	if (!trackingData) {
		return <p className="text-2xl">Loading data...</p>;
	}

	return (
		<div>
			<table>
				<tbody>
					{/* Iterate over the filtered data to create rows */}
					{Object.entries(trackingData).map(([key, value], index) => (
						<tr key={index}>
							<td className="text-left md:pr-36 pr-4">{key}</td>
							<td
								className={
									key === "Status" && value === "Pending"
										? "text-[#6EA011] text-left"
										: key === "Parcel number"
											? "text-[#FF833C] text-left"
											: "text-left py-[8px]"
								}>
								{String(value)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DetailTable;
