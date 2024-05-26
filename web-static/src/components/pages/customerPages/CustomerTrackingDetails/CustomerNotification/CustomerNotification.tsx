import React from "react";
import CustomizedTables from "./HistoryTable";
import BasicTable from "./RecentUpdate";

const CustomerNotification: React.FC = () => {
	return (
		<div className="mx-[80px]">
			<div>
				<BasicTable />
			</div>
			<div>
				<CustomizedTables />
			</div>
		</div>
	);
};
export default CustomerNotification;
