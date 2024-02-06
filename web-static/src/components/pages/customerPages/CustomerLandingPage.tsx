import React from "react";
import "../../../App.css";
import "../../../index.css";
import "../../../components/common/hero/Hero.css";
import Navbar from "../../common/header/Navbar";
import Hero from "../../common/hero/Hero";
import Track from "../../common/trackingSection/TrackingSection";
import Headerr from "../../common/header/Header";

const CustomerLandingPage: React.FC = () => {
	return (
		<div>
			<header>
				{/* Navigationtiiion bar component */}
				<Navbar />
				<Hero />\
				<Track />
			</header>
			<main></main>
		</div>
	);
};
export default CustomerLandingPage;
