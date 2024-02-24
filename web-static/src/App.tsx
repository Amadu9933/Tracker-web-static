import React from "react";
import "./App.css";
import "./index.css";
import CustomerLandingPage from "./components/pages/customerPages/CustomerLandingPage";
import CustomerTrackingDetailLayout from "./components/pages/customerPages/CustomerTrackingDetails/CustomerTrackingDetailLayout";

const App: React.FC = () => {
	return (
		<div className="App ">
			{/* Landing page */}

			<CustomerLandingPage />
			<CustomerTrackingDetailLayout />
		</div>
	);
};

export default App;
