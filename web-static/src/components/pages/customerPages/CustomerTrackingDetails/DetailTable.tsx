import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailTable: React.FC = () => {
	const { trackingNumber } = useParams<{ trackingNumber: string }>();
	const [trackingData, setTrackingData] = useState<any | null>(null);

	useEffect(() => {
		const fetchTrackingDetails = async () => {
			try {
				const response = await axios.get(
					`http://54.161.253.204:3000/api/tracking/${trackingNumber}/`
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
			} catch (error) {
				console.error("Error fetching tracking details:", error);
			}
		};
		fetchTrackingDetails();
	}, [trackingNumber]);

	if (!trackingData) {
		return <p>Loading...</p>;
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
										: "text-left py-[8px] "
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
