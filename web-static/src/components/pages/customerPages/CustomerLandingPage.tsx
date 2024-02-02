import React from "react";
import "../../../App.css";
import "../../../index.css";
import "../../../components/common/hero/Hero.css";
import Navbar from "../../common/header/Navbar";
import Hero from "../../common/hero/Hero";
import Track from "../../common/trackingSection/TrackingSection";

const CustomerLandingPage: React.FC = () => {
	return (
		<div>
			<header>
				<Navbar />
				<Hero />
				<Track />
			</header>
		</div>
	);
};
export default CustomerLandingPage;
