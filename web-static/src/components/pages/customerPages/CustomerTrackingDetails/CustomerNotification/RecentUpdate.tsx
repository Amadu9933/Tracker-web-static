import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const getStatusColor = (status: string) => {
	switch (status.toLowerCase()) {
		case "delivered":
			return "#B4D479";
		case "on the way":
			return "#FFE393";
		case "cancelled":
			return "#EA8389";
		case "returned":
			return "#FFC19E";
		default:
			return "#000";
	}
};

interface RecentUpdateProps {
	trackingData: any[];
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
					{trackingData.map((item: any, index: number) => (
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
										backgroundColor: getStatusColor(item.status),
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
								<div className="mr-8 text-[#A3A38E]">
									{item.time_of_purchase} hrs
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default RecentUpdate;
