import React from "react";
import DetailTable from "./DetailTable";
import Back from "../../../../assets/ep_back.png";
import Carbon from "../../../../assets/carbon_delivery-parcel.png";
import Button from "@mui/material/Button"; // Importing Button component from Material-UI

const CustomerTrackingDetails: React.FC = () => {
	// Define Button styling
	const buttonStyles = {
		backgroundColor: "#FF833C",
		color: "white",
		borderColor: "#FF833C",
		paddingTop: "12px",
		paddingRight: "18px",
		paddingBottom: "12px",
		paddingLeft: "18px",
		borderRadius: "8px",
		"&:focus": {
			borderColor: "#FF833C",
			backgroundColor: "#FF833C",
			color: "white",
		},
		"&:hover": {
			backgroundColor: "#FF833C",
			color: "white",
			borderColor: "#FF833C",
		},
		fontSize: "16px",
		fontWeight: "medium",
		textTransform: "none",
		width: { xs: "contain", md: "100%" },
		marginLeft: { xs: "0", md: "0" },
	};
	return (
		<div>
			<div className="flex justify-center mb-10 ">
				<a href="">
					<img
						className="w-[48px] h-[48px] mt-5 mr-4"
						src={Back}
						alt="return"
					/>
				</a>{" "}
				<h1 className="font-bold text-[#354755] text-[3.5rem]">
					Track your parcel today!
				</h1>{" "}
			</div>

			<div
				className="bg-[#FFF6F2] mb-44 py-14 text-base font-normal text-[#8E8A73]
                rounded-[22px] px-[4.5rem] w-[48.125rem]
                ">
				<div className=" text-left">
					<img
						className="bg-[#FFD6BE] rounded-full mb-[1rem]"
						src={Carbon}
						alt=""
					/>
					<h1 className="text-[2rem] font-medium text-[#37372D]">
						Parcel Tracking
					</h1>
					<p className="text-[1rem] text-[#37372D] font-normal pt-2">
						Your Parcel is on its way to you!
					</p>
				</div>

				<div className="my-10">
					<DetailTable />
				</div>
				<Button variant="outlined" sx={buttonStyles}>
					View live location
				</Button>
			</div>
		</div>
	);
};

export default CustomerTrackingDetails;
