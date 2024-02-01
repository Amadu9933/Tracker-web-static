// Navbar.tsx
import React from "react";
import "./Navbar.css";
import logo from "../../../assets/Logo.png";
import profileIcon from "../../../assets/iconoir_profile-circle.png";

const Navbar: React.FC = () => {
	return (
		<nav className="flex justify-between items-center px-20 py-6 font-medium  border-neutral-400  border ">
			<div className="text-2xl font-bold ">
				<img src={logo} alt="Logo" className="nav-logo" />
			</div>
			<div className="flex text-neutral-400  h-9 leading-5 ">
				<div className="nav-customer mr-4">Track my parcel</div>
				<div className="mr-4 nav-customer ">Ship</div>
				<div className="mr-4 nav-customer">Logistics solution</div>
				<div className="mr-4 nav-customer">Integration</div>
				<div className="mr-4 nav-customer">Need help ?</div>
				<div className="rounded flex py-2 px-4 border-neutral-400  border mt-0 justify-around">
					<img src={profileIcon} alt="profile-icon" />
					<a href="" className="ml-2">
						Login
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
