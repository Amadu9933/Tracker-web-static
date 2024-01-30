// Navbar.tsx
import React from "react";
import "./Navbar.css";
import logo from "../../../assets/Logo.png";

const Navbar: React.FC = () => {
	return (
		<nav className=" flex justify-between items-center px-10">
			<div className="text-2xl font-bold ">
				<img src={logo} alt="Logo" className="nav-logo" />
			</div>
			<div className="flex ">
				<div className="nav-customer mr-4 cursor-pointer">Track my parcel</div>
				<div className="nav-business cursor-pointer">Ship</div>
				<div>Logistics solution</div>
				<div>Integration</div>
				<div>Need help ?</div>
				<div>
					<img src="" alt="" />
					<button>Login</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
