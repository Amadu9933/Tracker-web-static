// Navbar.tsx
import React from "react";
import "./TrackingSection.css";
import logo from "../../../assets/carbon_delivery-parcel.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Height } from "@mui/icons-material";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",

	Height: "23.25rem",
	width: { xs: "285px", md: "29.4rem" },

	bgcolor: "white",
	border: "none",
	boxShadow: 24,
	p: 4,
	borderRadius: "0.5rem",
	paddingTop: "2.5rem",
	paddingButtom: "2.5rem",
	paddingleft: { xs: "24px" },
	paddingRight: { xs: "24px" },
};
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
	width: { xs: "100%", md: "100%" },
	marginLeft: { xs: "0", md: "0" },
	marginTop: "1.5rem",
};

const TrackingSection: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<section className="track-section  ">
			<div className="track-container">
				<img src={logo} alt="Logo" className="carbon-delivery" />
				<h2>Parcel Tracking</h2>
				<div className="enter-tracking">
					<p> Tracking I.D</p>

					<div className="my-parcels">
						<Button
							onClick={handleOpen}
							sx={{ color: "#ff833c", textTransform: "none" }}>
							View Tracking History
						</Button>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description">
							<Box sx={style}>
								<Typography
									id="modal-modal-title"
									variant="h6"
									component="h1"
									sx={{
										color: "#354755",
										fontWeight: "700",
										fontSize: { xs: "20px", md: "2rem" },
									}}>
									View order history
								</Typography>
								<Typography
									id="modal-modal-description"
									sx={{
										mt: 2,
										fontWeight: "400",
										fontSize: "1rem",
										color: "#354755",
										marginTop: "1.5rem",
										marginBottom: "1.5rem",
									}}>
									To view your order history please enter your email address
									associated with your orders.
								</Typography>

								<label className="text-[#354755] font-bold" htmlFor="">
									Email
								</label>
								<div className="search-container   mt-3 ">
									<input
										className=" "
										type="text"
										placeholder="example@gmail.com"
									/>
									<i className="search-icon "></i>
								</div>
								<Button variant="outlined" sx={buttonStyles}>
									Proceed
								</Button>
							</Box>
						</Modal>
					</div>
				</div>
				<div className="search-container  mt-3 ">
					<input
						style={{ backgroundColor: "#fdefe8" }}
						type="text"
						placeholder="Enter tracking ID"
					/>
					<i className="search-icon"></i>
				</div>
			</div>
		</section>
	);
};

export default TrackingSection;
