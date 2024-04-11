import React from "react";
import "../../../App.css";
import "../../../index.css";
import Navbar from "../../common/header/Navbar";
import Hero from "../../common/hero/Hero";
import Track from "../../common/trackingSection/TrackingSection";
import DidYouKnow from "../../pages/customerPages/CustomerDidYouKnow";
import Footer from "../../common/footer/Footer";
import MyQestionSection from "../../myQuestionSection/MyQestionSection";
import CustomerTrackingDetails from "../../pages/customerPages/CustomerTrackingDetails/CustomerTrackingDetails";

const CustomerLandingPage: React.FC = () => {
	return (
		<div>
			<header>
				{/* Navigationtiiion bar component */}

				<Hero />
				<Track />
			</header>
			<main>
				<DidYouKnow />
				<div className="md:mt-56 md:mb-60 mt-16 mb-16">
					<MyQestionSection />
				</div>
			</main>

			<Footer />
		</div>
	);
};
export default CustomerLandingPage;
