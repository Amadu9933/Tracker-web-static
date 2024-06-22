import React from "react";
import DetailTable from "./DetailTable";
import Back from "../../../../assets/ep_back.png";
import Carbon from "../../../../assets/carbon_delivery-parcel.png";
import Button from "@mui/material/Button"; // Importing Button component from Material-UI
import { Link } from "react-router-dom";

/**
 * Renders the customer tracking details component.
 *
 * @return {JSX.Element} The rendered customer tracking details component.
 */
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

	console.log("Rendering CustomerTrackingDetails component");

	return (
		<div className="  justify-right ">
			<div className="flex justify-center mb-10 ">
				<Link to="/">
					<img
						className="md:w-[48px] md:h-[48px] w-6 h-6 md:mt-0 mt-[6px] mr-4"
						src={Back}
						alt="return"
					/>
				</Link>
				<h1 className="font-bold  text-[#354755] md:text-[3.5rem] text-2xl ">
					Track your parcel today!
				</h1>
			</div>
			<div className=" flex justify-center">
				<div
					className="bg-[#FFF6F2]  py-14 text-base font-normal text-[#423e26] md:text-[16px] text-[14px]
                rounded-[22px] md:px-[4.5rem] px-[30px] md:w-[48.125rem]  w-[346px] 
                ">
					<div className=" text-left">
						<img
							className="bg-[#FFD6BE] rounded-full mb-[1rem]"
							src={Carbon}
							alt=""
						/>
						<h1 className="md:text-[2rem] text-[1.125rem] font-medium text-[#37372D]">
							Parcel Tracking
						</h1>
						<p className="md:text-[1rem] text-[12px] text-[#37372D] font-normal pt-2">
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
		</div>
	);
};

export default CustomerTrackingDetails;
