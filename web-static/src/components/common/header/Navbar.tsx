import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import "./Navbar.css";

// Importing assets
import profileIcon from "../../../assets/iconoir_profile-circle.png";
import logo from "../../../assets/Logo.png";

const Navbar: React.FC = () => {
	// State for handling the Menu component
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	// Event handlers for opening and closing the Menu
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// Styles for links
	const linkStyles = {
		color: "#B1B2B2",
		textDecoration: "none",
	};

	// Menu items data
	const menuItems = [
		{ label: "Track my parcel", link: "/" },
		{ label: "Ship", link: "/Ship" },
		{ label: "Logistics solution", link: "/LogisticSolution" },
		{ label: "Integration", link: "/Intergration" },
		{ label: "Need help ?", link: "/NeedHelp" },
	];

	return (
		<div className="px-7">
			{/* Top-level container for the entire Navigation bar */}
			<AppBar
				position="static"
				sx={{
					backgroundColor: "white",
					borderColor: "1px solid #D9E1E7",
					boxShadow: "none",
				}}>
				{/* Toolbar containing various sections */}
				<Toolbar sx={{ justifyContent: "space-between" }}>
					{/* Logo section */}
					<IconButton
						size="large"
						edge="start"
						aria-label="logo"
						sx={{ flexFlow: 1, display: { xs: "none", md: "flex" } }}>
						<img src={logo} alt="Logo" className="nav-logo" />
					</IconButton>
					{/* Navigation links section */}
					<Box
						sx={{
							display: { xs: "none", md: "flex", lg: "flex" },
							alignItems: "center",
							fontWeight: 500,
							fontSize: "0.875rem",
						}}>
						{menuItems.map((item, index) => (
							<NavLink
								className="Navbar"
								key={index}
								to={item.link}
								style={{
									color: "#B1B2B2",
									marginLeft: "2rem",
								}}>
								{item.label}
							</NavLink>
						))}
						{/*user  Profile section */}
						<Box
							sx={{
								marginLeft: "2rem",
								display: "flex",
								border: "1px solid #B1B2B2",
								borderRadius: "5px",
								height: "40px",
								justifyContent: "space-between",
								padding: "9px",
							}}>
							<div className="flex h-8 9">
								<img
									src={profileIcon}
									alt="profile-icon"
									style={{ height: "20px", width: "20px" }}
								/>
								<NavLink
									className="Navbar"
									style={{
										color: "#B1B2B2",
										marginLeft: "10px",
										marginTop: "-3px",
										height: "20px",
									}}
									to="/Login">
									Login
								</NavLink>
							</div>
						</Box>
					</Box>
					{/* Logo for small and medium screens*/}
					<IconButton
						size="large"
						edge="end"
						aria-label="logo"
						sx={{
							justifyContent: { xs: "flex-end" },
							display: { xs: "flex", md: "none" },
						}}>
						<img src={logo} alt="Logo" className="nav-logo" />
					</IconButton>
					{/* Mobile menu for small screens */}
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							id="demo-positioned-button"
							aria-controls={open ? "demo-positioned-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
							onClick={handleClick}>
							<MenuIcon />
						</IconButton>
						{/* Mobile menu content */}
						<Menu
							id="demo-positioned-menu"
							aria-labelledby="demo-positioned-button"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							anchorOrigin={{ vertical: "top", horizontal: "left" }}
							transformOrigin={{ vertical: "top", horizontal: "left" }}>
							{/* Menu list */}
							<MenuItem onClick={handleClose}>
								<CloseIcon />
							</MenuItem>
							{menuItems.map((item, index) => (
								<MenuItem key={index}>
									<NavLink style={{ ...linkStyles }} to={item.link}>
										{item.label}
									</NavLink>
								</MenuItem>
							))}
							<MenuItem>
								<Box
									sx={{
										display: "flex",
										padding: "0.625rem",
										border: "1px solid #B1B2B2",
										borderRadius: "5px",
										height: "40px",
										justifyContent: "space-between",
									}}>
									<img
										src={profileIcon}
										alt="profile-icon"
										style={{ height: "20px", width: "20px" }}
									/>
									<NavLink
										className="Navbar"
										style={{
											...linkStyles,
											marginLeft: "0.625rem",
											height: "40px",
										}}
										to="/Login">
										Login
									</NavLink>
								</Box>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
