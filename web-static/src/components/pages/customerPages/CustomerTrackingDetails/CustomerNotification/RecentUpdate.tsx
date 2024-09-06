import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

/**
 * Returns the color associated with the given status.
 *
 * @param {string} status - The status to get the color for.
 * @return {string} The color associated with the given status.
 */
const getStatusColor = (status: string) => {
	console.log(`Getting color for status: "${status}"`);

	const trimmedStatus = status.trim().toLowerCase();
	console.log(`Trimmed status: "${trimmedStatus}"`);

	switch (trimmedStatus) {
		case "delivered":
			console.log(`Color for status "delivered": #B4D479`);
			return "#B4D479";
		case "on the way":
			console.log(`Color for status "on the way": #FFE393`);
			return "#FFE393";
		case "cancelled":
		case "canceled": // Add alternative spelling
			console.log(`Color for status "cancelled" or "canceled": #EA8389`);
			return "#EA8389";
		case "returned":
			console.log(`Color for status "returned": #FFC19E`);
			return "#FFC19E";
		case "in transit": // Add additional status
			console.log(`Color for status "in transit": #87CEEB`);
			return "#87CEEB";
		case "pending": // Add additional status
			console.log(`Color for status "pending": #FFA500`);
			return "#FFA500";
		default:
			console.log(`Color for default status: #000000`);
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

/**
 * Renders a table of recent updates based on the tracking data passed in as a prop.
 *
 * @param {RecentUpdateProps} props - The props object containing the tracking data.
 * @return {JSX.Element|null} The rendered table of recent updates, or null if the tracking data is not an array.
 */
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
									Your order - {item.details.status1}
									<div style={{ color: "#A3A38E", marginLeft: "25px" }}>
										{item.details.status2}
									</div>
									s
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
