import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import CustomizedTables from "./HistoryTable";
import RecentUpdate from "./RecentUpdate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "./Data";


const CustomerNotification: React.FC = () => {
	const { email } = useParams<{ email: string }>();
	const navigate = useNavigate();
	const [trackingData, setTrackingData] = useState<any>(null);
	const [errorMessage, setErrorMessage] = useState<string>("");

	useEffect(() => {
		const fetchTrackingData = async () => {
			try {
				if (!email) {
					throw new Error("No email provided");
				}

				const response = await fetch(
					`http://172.232.4.147:8000/api/v1/trackings/history/?email=${email}`
				);
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}

				const data = await response.json();
				setTrackingData(data);
			} catch (error: any) {
				setErrorMessage(error.message);
			}
		};

		fetchTrackingData();
	}, [email]);

	if (errorMessage) {
		return <div>Error: {errorMessage}</div>;
	}

	if (!trackingData) {
		return (
			<div>
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className="m-[80px]">
			<div className="flex">
				<ArrowBackIcon onClick={() => navigate(-1)} />
				<p className="font-bold ml-[5px]">Parcel History</p>
			</div>
			<div className="border-b-2 border-[#D9E1E7] mb-2 mt-10 text-left">
				<p className="text-[#5D5D4C]">Recent update</p>
			</div>
			<div>
				<RecentUpdate trackingData={trackingData} />
			</div>
			<div className="border-b-2 border-[#D9E1E7] mb-2 mt-10 text-left">
				<p className="text-[#5D5D4C]">History</p>
			</div>
			<div>
				<CustomizedTables trackingData={trackingData} />
			</div>
		</div>
	);
};

export default CustomerNotification;
