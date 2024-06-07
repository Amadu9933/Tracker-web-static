import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
	date: string,
	hours: number,
	status: "Delivered" | "On the way" | "Cancelled" | "Returned"
) {
	return { date, hours, status };
}

const rows = [
	createData("01/01/2023", 20, "On the way"),
	createData("02/02/2023", 18, "Delivered"),
	createData("03/03/2023", 15, "Cancelled"),
	createData("04/04/2023", 12, "Returned"),
	createData("05/05/2023", 10, "On the way"),
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "Delivered":
			return "#B4D479";
		case "On the way":
			return "#FFE393";
		case "Cancelled":
			return "#EA8389";
		case "Returned":
			return "#FFC19E";
		default:
			return "#000";
	}
};

const getStatusText = (status: string) => {
	switch (status) {
		case "Delivered":
			return "has been delivered\nArrived";
		case "On the way":
			return "is on the way\nEstimated time of arrival ~ 3 days";
		case "Cancelled":
			return "has been cancelled\nEstimated time of arrival ~ pending";
		case "Returned":
			return "has been returned\nEstimated time of arrival ~ pending";
		default:
			return "";
	}
};

const Ellipse: React.FC<{ status: string }> = ({ status }) => {
	return (
		<span
			style={{
				display: "inline-block",
				width: "16px",
				height: "16px",
				backgroundColor: getStatusColor(status),
				borderRadius: "50%",
				marginRight: "8px",
			}}></span>
	);
};

export default function BasicTable() {
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
					{rows.map((row, index) => (
						<TableRow
							key={index}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<TableCell
								component="th"
								scope="row"
								style={{ color: "#5D5D4C" }}>
								<Ellipse status={row.status} />
								Your order - F3858678564S{" "}
								{getStatusText(row.status).split("\n")[0]}
								<div style={{ color: "#A3A38E", marginLeft: "25px" }}>
									{getStatusText(row.status).split("\n")[1]}
								</div>
							</TableCell>
							<TableCell align="right" style={{ color: "#5D5D4C" }}>
								<div>{row.date}</div>
								<div className="mr-8   text-[#A3A38E]">{row.hours} hrs</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
