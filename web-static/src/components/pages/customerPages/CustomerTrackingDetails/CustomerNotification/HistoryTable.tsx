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
		borderButtom: "1px solid #F9F9F9",
		opacity: "0px",
		textAlign: "left", // Align body text to the left
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		height: "47px", // Height for the body cells
		padding: "12px 24px", // Padding for the body cells
		gap: "12px",
		border: "1px solid #F9F9F9", // Border style for the body cells
		textAlign: "left", // Align body text to the left
	},
	"&:first-child": {
		width: "auto", // Reset width for the first column
	},
	"&:nth-child(2)": {
		width: "auto", // Reset width for the second column
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

function createData(
	id: number,
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number
) {
	return { id, name, calories, fat, carbs, protein };
}

const rows = [
	createData(1, "Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData(2, "Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData(3, "Eclair", 262, 16.0, 24, 6.0),
	createData(4, "Cupcake", 305, 3.7, 67, 4.3),
	createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 700, border: "1px solid #D2D3D3" }}
				aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>#</StyledTableCell>
						<StyledTableCell>Dessert (100g serving)</StyledTableCell>
						<StyledTableCell align="right">Calories</StyledTableCell>
						<StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
						<StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
						<StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<StyledTableRow key={row.name}>
							<StyledTableCell component="th" scope="row">
								{index + 1}
							</StyledTableCell>
							<StyledTableCell>{row.name}</StyledTableCell>
							<StyledTableCell align="right">{row.calories}</StyledTableCell>
							<StyledTableCell align="right">{row.fat}</StyledTableCell>
							<StyledTableCell align="right">{row.carbs}</StyledTableCell>
							<StyledTableCell align="right">{row.protein}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
