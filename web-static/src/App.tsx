import React from "react";

import "./App.css";
import "./index.css";
import CustomerLandingPage from "./components/pages/customerPages/CustomerLandingPage";
import CustomerTrackingDetailLayout from "./components/pages/customerPages/CustomerTrackingDetails/CustomerTrackingDetailLayout";
import AppRoutes from "./components/Routes";
const App: React.FC = () => {
	return (
		<div className="App ">
			<AppRoutes />
			{/* Landing page */}

			<CustomerLandingPage />
			<CustomerTrackingDetailLayout />
		</div>
	);
};

export default App;
