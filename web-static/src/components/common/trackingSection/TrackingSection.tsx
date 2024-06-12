// TrackingSection.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrackingSection.css";
import logo from "../../../assets/carbon_delivery-parcel.png";
import Button from "@mui/material/Button";
import ModalSection from "./ModalSection";

const TrackingSection: React.FC = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [trackingNumber, setTrackingNumber] = useState<string>("");
	const navigate = useNavigate();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTrackingNumber(event.target.value);
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			navigate(`/tracking/${trackingNumber}`);
		}
	};

	return (
		<section className="track-section">
			<div className="track-container">
				<img src={logo} alt="Logo" className="carbon-delivery" />
				<h2>Parcel Tracking</h2>
				<div className="enter-tracking">
					<p>Tracking I.D</p>
					<div className="my-parcels">
						<Button
							onClick={handleOpen}
							sx={{ color: "#ff833c", textTransform: "none" }}>
							View Tracking History
						</Button>
						<ModalSection open={open} handleClose={handleClose} />
					</div>
				</div>
				<div className="search-container mt-3">
					<input
						style={{ backgroundColor: "#fdefe8" }}
						type="text"
						placeholder="Enter tracking number and press Enter"
						value={trackingNumber}
						onChange={handleInputChange}
						onKeyDown={handleKeyPress}
					/>
					<i className="search-icon"></i>
				</div>
			</div>
		</section>
	);
};

export default TrackingSection;
