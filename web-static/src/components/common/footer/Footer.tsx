import React from "react";
import MyButton from "../buttons/Mybutton";
import Button from "@mui/material/Button";
// import "./Footer.css";

const handleClick = () => {
	console.log("Button clicked!");
};

const Footer: React.FC = () => {
	return (
		<footer
			className="footer pt-8 px-6 column md:pt-12 md:px-32 "
			style={{ backgroundColor: "#354755", color: "#C6C5B9" }}>
			<div className=" flex flex-wrap justify-between md:flex md:justify-between  md:font-medium">
				<div className="item text-left">
					<h2 className="font-medium text-white text text-2xl pb-4">
						Join To Get Started
					</h2>
					<p className="pb-4    font-medium">Your Parcel's journey your way.</p>
					<Button
						variant="outlined"
						sx={{
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
							fontSize: "16px",
							fontWeight: "bold",
							width: { xs: "contain", md: "100%" },
							marginLeft: { xs: "0", md: "0" },
						}}>
						Get started
					</Button>
				</div>

				<div className="item mr-9 md:mr-0">
					<h1 className="text-lg text-white pb-4 text-left">Company</h1>
					<p className="pb-4 text-left">How it works</p>
					<p className="pb-4 text-left">Career</p>
					<p className="pb-4 text-left">Legal</p>
				</div>

				<div className=" mt-10 md:mt-0 md:text-left text-left">
					<h1 className="text-lg text-white pb-4 ">Help</h1>
					<p className="pb-4 ">Privacy Policy</p>
					<p className="pb-4 ">Refund Policy</p>
					<p className="pb-4 ">Track Your Order</p>
				</div>

				<div className="mt-10 md:mt-0  md:item md:text-left text-left">
					<h1 className="text-lg text-white pb-4 ">Support</h1>
					<p className="pb-4 ">Feedback</p>
					<p className="pb-4 ">Contact Us</p>
					<p className="pb-4 ">Customer Service</p>
					<p className="pb-4 ">Terms & condition</p>
				</div>
			</div>
			<p className="copy-right flex justify-start mt-12 pb-24 text-white">
				Trackerr &copy; 2023. All rights reserved
			</p>
		</footer>
	);
};

export default Footer;

// <div className="container">
// 	<footer className="footer flex justify-between bg-slate-700 w-full">
// 		<div className="item">
// 			<h2>Join To Get Started</h2>
// 			<p>Your Parcel's journey your way.</p>
// 			<MyButton
// 				onClick={handleClick}
// 				label="Get started"
// 				state="Primary"
// 				size="Small"
// 				background="#FF833C"
// 			/>
// 		</div>

// 		<div className="item">
// 			<h1>Company</h1>
// 			<p>How it works</p>
// 			<p>Career</p>
// 			<p>Legal</p>
// 		</div>

// 		<div className="item">
// 			<h1>Help</h1>
// 			<p>Privacy Policy</p>
// 			<p>Refund Policy</p>
// 			<p>Track Your Order</p>
// 		</div>

// 		<div className="item">
// 			<h1>Support</h1>
// 			<p>Feedback</p>
// 			<p>Contact Us</p>
// 			<p>Customer Service</p>
// 			<p>Terms & condition</p>
// 		</div>
// 	</footer>
// 	<p className="copy-right ">Trackerr &copy; 2023. All rights reserved</p>
// </div>
