import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#F2F5F7",
		color: "#537086",
		width: "215px", // Width for the first column
		height: "47px", // Height for the header cells
		padding: "12px 24px", // Padding for the header cells
		gap: "12px",
		borderTop: "1px solid #D2D3D3", // Border style for the header cells
		borderBottom: "1px solid #F9F9F9",
		textAlign: "left", // Align body text to the left
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		height: "47px", // Height for the body cells
		padding: "12px 24px", // Padding for the body cells
		gap: "12px",
		border: "1px solid #F9F9F9", // Border style for the body cells
		textAlign: "left", // Align body text to the left
		color: "#5D5D4C",
	},
	"&:first-child": {
		width: "auto", // Reset width for the first column
	},
	"&:nth-child(2)": {
		width: "539px", // Set width for the second column (Tracking Number)
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(even)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const getStatusColor = (status: string) => {
	switch (status) {
		case "Delivered":
			return "#6EA011";
		case "Cancelled":
			return "#EA8389";
		case "Returned":
			return "#FF985D";
		default:
			return "#5D5D4C";
	}
};

const formatDateTime = (datetime: string) => {
	const [date, time] = datetime.split(" ");
	return (
		<span>
			{date}
			<br />
			<span style={{ color: "#C6C5B9" }}>{time}hrs</span>
		</span>
	);
};

function createData(
	id: number,
	trackingNumber: string,
	ordered: string,
	delivered: string,
	status: "Delivered" | "Cancelled" | "Returned"
) {
	return { id, trackingNumber, ordered, delivered, status };
}

const rows = [
	createData(
		1,
		"F3858678564S",
		"01/01/2023 14:00",
		"02/01/2023 10:00",
		"Delivered"
	),
	createData(
		2,
		"B3847484848D",
		"01/02/2023 11:00",
		"02/02/2023 12:00",
		"Cancelled"
	),
	createData(
		3,
		"C3847575757E",
		"01/03/2023 16:00",
		"02/03/2023 15:00",
		"Returned"
	),
	createData(
		4,
		"D3847575757F",
		"01/04/2023 10:00",
		"02/04/2023 09:00",
		"Delivered"
	),
	createData(
		5,
		"E3847575757G",
		"01/05/2023 12:00",
		"02/05/2023 14:00",
		"Cancelled"
	),
];

export default function CustomizedTables() {
	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 700, border: "1px solid #D2D3D3" }}
				aria-label="customized table">
				<TableHead>
					<TableRow sx={{ fontSize: "18px" }}>
						<StyledTableCell>#</StyledTableCell>
						<StyledTableCell>Tracking Number</StyledTableCell>
						<StyledTableCell>Date Ordered</StyledTableCell>
						<StyledTableCell>Date Delivered</StyledTableCell>
						<StyledTableCell>Status</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<StyledTableRow key={row.trackingNumber}>
							<StyledTableCell component="th" scope="row">
								#{index + 1}
							</StyledTableCell>
							<StyledTableCell>{row.trackingNumber}</StyledTableCell>
							<StyledTableCell>{formatDateTime(row.ordered)}</StyledTableCell>
							<StyledTableCell>{formatDateTime(row.delivered)}</StyledTableCell>
							<StyledTableCell style={{ color: getStatusColor(row.status) }}>
								{row.status}
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
