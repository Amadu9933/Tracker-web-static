import React from "react";
import "./App.css";
import "./index.css";
import CustomerLandingPage from "./components/pages/customerPages/CustomerLandingPage";

const App: React.FC = () => {
	return (
		<div className="App ">
			{/* Landing page */}

			<CustomerLandingPage />
		</div>
	);
};

export default App;
