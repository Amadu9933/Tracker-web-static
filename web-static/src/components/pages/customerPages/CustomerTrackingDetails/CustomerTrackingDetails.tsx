import React from "react";
import DetailTable from "./DetailTable";

const CustomerTrackingDetails: React.FC = () => {
	return (
		<div>
			<div>
				{" "}
				<img src="" alt="" /> <h1>Track your parcel today!</h1>{" "}
			</div>

			<div>
				<img src="" alt="" />
				<h1>Parcel Tracking</h1>
				<p>Your Parcel is on its way to you!</p>
			</div>

			<div>
				<DetailTable />
			</div>
		</div>
	);
};

export default CustomerTrackingDetails;
