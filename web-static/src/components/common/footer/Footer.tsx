import React from "react";
import Button from "@mui/material/Button"; // Importing Button component from Material-UI

const Footer: React.FC = () => {
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
		<footer
			className="footer pt-8 px-6 column md:pt-12 md:px-32"
			style={{ backgroundColor: "#354755", color: "#C6C5B9" }}>
			<div className="flex flex-wrap justify-between md:flex md:justify-between md:font-medium">
				{/* First column */}
				<div className="item text-left">
					<h2 className="font-medium text-white text text-2xl pb-4">
						Join To Get Started
					</h2>
					<p className="pb-4 font-medium">Your Parcel's journey your way.</p>
					{/* Button */}
					<Button variant="outlined" sx={buttonStyles}>
						Get started
					</Button>
				</div>

				{/* Second column */}
				<div className="item mr-9 md:mr-0">
					<h1 className="text-lg text-white pb-4 text-left">Company</h1>
					<p className="pb-4 text-left">How it works</p>
					<p className="pb-4 text-left">Career</p>
					<p className="pb-4 text-left">Legal</p>
				</div>

				{/* Third column */}
				<div className="mt-10 md:mt-0 md:text-left text-left">
					<h1 className="text-lg text-white pb-4">Help</h1>
					<p className="pb-4">Privacy Policy</p>
					<p className="pb-4">Refund Policy</p>
					<p className="pb-4">Track Your Order</p>
				</div>

				{/* Fourth column */}
				<div className="mt-10 md:mt-0 md:item md:text-left text-left">
					<h1 className="text-lg text-white pb-4">Support</h1>
					<p className="pb-4">Feedback</p>
					<p className="pb-4">Contact Us</p>
					<p className="pb-4">Customer Service</p>
					<p className="pb-4">Terms & condition</p>
				</div>
			</div>
			{/* Footer text */}
			<p className="copy-right flex justify-start mt-12 pb-24 text-white">
				Trackerr &copy; 2023. All rights reserved
			</p>
		</footer>
	);
};

export default Footer;
