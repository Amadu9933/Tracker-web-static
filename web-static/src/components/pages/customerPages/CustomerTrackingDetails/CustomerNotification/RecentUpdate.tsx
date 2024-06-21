import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const getStatusColor = (status: string) => {
	switch (status.trim().toLowerCase()) {
		case "delivered":
			return "#B4D479";
		case "on the way":
			return "#FFE393";
		case "cancelled":
		case "canceled": // Add alternative spelling
			return "#EA8389";
		case "returned":
			return "#FFC19E";
		case "in transit": // Add additional status
			return "#87CEEB"; // Example color for "in transit"
		case "pending": // Add additional status
			return "#FFA500"; // Example color for "pending"
		default:
			return "#000000"; // Default color
	}
};

interface TrackingDataItem {
	status: string;
	parcel_number: string;
	details: {
		status1: string;
		status2: string;
	};
	date_of_purchase: string;
	time_of_purchase: string;
}

interface RecentUpdateProps {
	trackingData: TrackingDataItem[];
}

const RecentUpdate: React.FC<RecentUpdateProps> = ({ trackingData = [] }) => {
	if (!Array.isArray(trackingData)) {
		console.error(
			"Invalid data prop passed to RecentUpdate. Expected an array."
		);
		return null;
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell style={{ color: "#5D5D4C" }}></TableCell>
						<TableCell align="right" style={{ color: "#5D5D4C" }}></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{trackingData.map((item, index) => {
						const color = getStatusColor(item.status);
						console.log(`Status: "${item.status}", Color: "${color}"`);

						return (
							<TableRow
								key={index}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell
									component="th"
									scope="row"
									style={{ color: "#5D5D4C" }}>
									<span
										style={{
											display: "inline-block",
											width: "16px",
											height: "16px",
											backgroundColor: color,
											borderRadius: "50%",
											marginRight: "8px",
										}}></span>
									Your order - {item.parcel_number} {item.details.status1}
									<div style={{ color: "#A3A38E", marginLeft: "25px" }}>
										{item.details.status2}
									</div>
								</TableCell>
								<TableCell align="right" style={{ color: "#5D5D4C" }}>
									<div>{item.date_of_purchase}</div>
									<div className=" text-[#A3A38E]">
										{item.time_of_purchase} hrs
									</div>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default RecentUpdate;
