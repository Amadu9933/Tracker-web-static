// Routes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomerTrackingDetailLayout from "./pages/customerPages/CustomerTrackingDetails/CustomerTrackingDetailLayout";

import Navbar from "./common/header/Navbar";

const AppRoutes: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/about" element={<CustomerTrackingDetailLayout />} />
			</Routes>
		</Router>
	);
};

export default AppRoutes;
