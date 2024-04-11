<<<<<<< HEAD


import React from 'react';
import './App.css'
import './index.css'
import MyButton from './components/common/buttons/Mybutton';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import LastChild from './components/common/header/HeaderLastChild';
import Hero from './components/common/hero/Hero';
import ForgetPassword from './components/pages/customerPages/customerAuthentication/ForgetPassword';
import CustomerSignUp from './components/pages/customerPages/customerAuthentication/CustomerSignUp';
import TrackingSection from './components/common/trackingSection/TrackingSection';
import CardSection from './components/common/cards/CardSection';


=======
import React from "react";
import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Rou/Home";
import About from "./components/Rou/About";
import Contact from "./components/Rou/Contact";
import Layout from "./components/Rou/Layout";
import TrackYourParcel from "./components/NavigationBarLinksComponents/TrackYourParcel";
import Ship from "./components/NavigationBarLinksComponents/Ship";
import LogisticSolution from "./components/NavigationBarLinksComponents/LogisticSolution";
import Intergration from "./components/NavigationBarLinksComponents/Intergration";
import NeedHelp from "./components/NavigationBarLinksComponents/NeedHelp";
import Login from "./components/NavigationBarLinksComponents/Login";
import CustomerLandingPage from "./components/pages/customerPages/CustomerLandingPage";
>>>>>>> c041d0bbe44b0e9ea6c8552d70489fd99d9a189c
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
