import React from "react";
import CustomizedTables from "./HistoryTable";
import BasicTable from "./RecentUpdate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CustomerNotification: React.FC = () => {
	return (
		<div className="m-[80px]">
			<div className="flex">
				<ArrowBackIcon />
				<p>Parcel History</p>
			</div>
			<div className="border-b-2 border-[#D9E1E7]  mb-2 mt-10 text-left">
				<p className="text-[#5D5D4C]">Recent update</p>
			</div>
			<div></div>
			<div>
				<BasicTable />
			</div>
			<div className="border-b-2 border-[#D9E1E7] mb-2 mt-10 text-left">
				<p className="text-[#5D5D4C]">History</p>
			</div>
			<div>
				<CustomizedTables />
			</div>
		</div>
	);
};
export default CustomerNotification;
