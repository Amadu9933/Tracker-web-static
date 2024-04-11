import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../common/header/Navbar";

const Layout: React.FC = () => {
	return (
		<>
			{/* <nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/About">About</Link>
					</li>
					<li>
						<Link to="/Contact">Contact</Link>
					</li>
				</ul>
			</nav> */}
			<header>
				<Navbar />
			</header>

			<Outlet />
		</>
	);
};

export default Layout;
