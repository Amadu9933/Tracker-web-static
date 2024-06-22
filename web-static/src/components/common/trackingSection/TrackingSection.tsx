// TrackingSection.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrackingSection.css";
import logo from "../../../assets/carbon_delivery-parcel.png";
import Button from "@mui/material/Button";
import ModalSection from "./ModalSection";
import CircularProgress from "../../pages/customerPages/CustomerTrackingDetails/CustomerNotification/Data";

const TrackingSection: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [trackingId, setTrackingId] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleTrackingIdChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setTrackingId(event.target.value);
		setError(null);
	};

	const mockFetchRequest = (_trackingId: string) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (Math.random() < 0.5) {
					reject(new Error("Failed to fetch data"));
				} else {
					resolve({ success: true });
				}
			}, 1000);
		});
	};

	const handleEnterKeyPress = async (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === "Enter") {
			if (!trackingId) {
				alert("Please enter a tracking number");
				return;
			}

			setLoading(true);
			setError(null);

			try {
				await mockFetchRequest(trackingId);
				navigate(`/tracking/${trackingId}`);
			} catch (err) {
				setError("Failed to fetch data. Please try again.");
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div>
			{loading ? (
				<div className="border-none  absolute ">
					<CircularProgress />
				</div>
			) : (
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
							<>
								<input
									style={{ backgroundColor: "#fdefe8" }}
									type="text"
									placeholder="Enter tracking number and press Enter"
									value={trackingId}
									onChange={handleTrackingIdChange}
									onKeyDown={handleEnterKeyPress}
								/>
								<i className="search-icon"></i>
							</>

							{error && <p style={{ color: "red" }}>{error}</p>}
						</div>
					</div>
				</section>
			)}
		</div>
	);
};

export default TrackingSection;
