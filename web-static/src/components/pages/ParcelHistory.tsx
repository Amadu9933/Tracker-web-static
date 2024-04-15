import React from "react";
import { data } from "./../../data";

const ParcelHistory: React.FC = () => {
	console.log(data);
	return (
		<div>
			<tbody>
				{data.map((item) => (
					<tr>
						<tr>{item.parcel_number}</tr>
						<tr>{item.status}</tr>
					</tr>
				))}
			</tbody>
		</div>
	);
};

export default ParcelHistory;
