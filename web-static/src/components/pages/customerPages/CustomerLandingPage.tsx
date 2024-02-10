import React from "react";
import "../../../App.css";
import "../../../index.css";
import Navbar from "../../common/header/Navbar";
import Hero from "../../common/hero/Hero";
import Track from "../../common/trackingSection/TrackingSection";
import DidYouKnow from "../../pages/customerPages/CustomerDidYouKnow";
import Footer from "../../common/footer/Footer";

const CustomerLandingPage: React.FC = () => {
	return (
		<div>
			<header>
				{/* Navigationtiiion bar component */}
				<Navbar />
				<Hero />\
				<Track />
			</header>
			<main>
				<DidYouKnow />
			</main>

			<Footer />
		</div>
	);
};
export default CustomerLandingPage;
