import React from "react";
import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Rou/Layout";
import Ship from "./components/NavigationBarLinksComponents/Ship";
import LogisticSolution from "./components/NavigationBarLinksComponents/LogisticSolution";
import Intergration from "./components/NavigationBarLinksComponents/Intergration";
import NeedHelp from "./components/NavigationBarLinksComponents/NeedHelp";
import Login from "./components/NavigationBarLinksComponents/Login";
import CustomerLandingPage from "./components/pages/customerPages/CustomerLandingPage";
import CustomerTrackingDetailLayout from "./components/pages/customerPages/CustomerTrackingDetails/CustomerTrackingDetailLayout";
import CustomerTrackingDetails from "./components/pages/customerPages/CustomerTrackingDetails/CustomerTrackingDetails";

const App: React.FC = () => {
	return (
		<div className="App ">
			<Routes>
				{/* <Route path="/" element={<Layout />}>
					<Route path="" element={<Home />} />
					<Route path="About" element={<About />} />
					<Route path="Contact" element={<Contact />} />
				</Route> */}

				<Route path="/" element={<Layout />}>
					{/* Home default component */}
					<Route path="" element={<CustomerLandingPage />} />
					<Route
						path="tracking/:trackingNumber"
						element={<CustomerTrackingDetailLayout />}
					/>
					<Route path="Ship" element={<Ship />} />
					<Route path="LogisticSolution" element={<LogisticSolution />} />
					<Route path="Intergration" element={<Intergration />} />
					<Route path="NeedHelp" element={<NeedHelp />} />
					<Route path="Login" element={<Login />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
