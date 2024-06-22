// TrackingSection.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrackingSection.css";
import logo from "../../../assets/carbon_delivery-parcel.png";
import Button from "@mui/material/Button";
import ModalSection from "./ModalSection";

// This is the TrackingSection component. It is responsible for rendering the main tracking section of the application.
const TrackingSection: React.FC = () => {
	// State variables
	const [open, setOpen] = useState(false); // State variable to control the open/close state of the modal
	console.log("Open state:", open); // Debugging statement
	const handleOpen = () => {
		console.log("Opening modal...");
		setOpen(true);
	};
	const handleClose = () => {
		console.log("Closing modal...");
		setOpen(false);
	};

	const [trackingId, setTrackingId] = useState<string>("");
	console.log("Tracking ID state:", trackingId); // Debugging statement
	const navigate = useNavigate();

	// Function to handle changes in the tracking ID input field
	const handleTrackingIdChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		console.log("Tracking ID changed:", event.target.value);
		setTrackingId(event.target.value);
	};

	// Function to handle the "Enter" key press event in the tracking ID input field
	const handleEnterKeyPress = (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === "Enter") {
			console.log("Enter key pressed. Navigating to /tracking/", trackingId);
			navigate(`/tracking/${trackingId}`);
		}
	};

	return (
		// JSX for the TrackingSection component
		<section className="track-section">
			<div className="track-container">
				<img src={logo} alt="Logo" className="carbon-delivery" />
				<h2>Parcel Tracking</h2>
				<div className="enter-tracking">
					<p>Tracking I.D</p>
					<div className="my-parcels">
						{/* Button to open the modal */}
						<Button
							onClick={handleOpen}
							sx={{ color: "#ff833c", textTransform: "none" }}>
							View Tracking History
						</Button>
						{/* Modal component to display the tracking history */}
						<ModalSection open={open} handleClose={handleClose} />
					</div>
				</div>
				<div className="search-container mt-3">
					{/* Input field for the user to enter the tracking ID */}
					<input
						style={{ backgroundColor: "#fdefe8" }}
						type="text"
						placeholder="Enter tracking number and press Enter"
						value={trackingId}
						onChange={handleTrackingIdChange}
						onKeyDown={handleEnterKeyPress}
					/>
					<i className="search-icon"></i>
				</div>
			</div>
		</section>
	);
};

export default TrackingSection;
