import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";

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
		"&:hover": {
			textDecoration: "underline",
			textDecorationColor: "#354755",
			color: "#354755",
		},
	};

	// Menu items data
	const menuItems = [
		{ label: "Track my parcel", link: "#" },
		{ label: "Ship", link: "#" },
		{ label: "Logistics solution", link: "#" },
		{ label: "Integration", link: "#" },
		{ label: "Need help ?", link: "#" },
	];

	return (
		<div>
			{/* Top-level container for the entire Navigation bar */}
			<AppBar
				position="static"
				sx={{ backgroundColor: "white", borderColor: "1px solid #D9E1E7" }}>
				{/* Toolbar containing various sections */}
				<Toolbar sx={{ justifyContent: "space-between", padding: "1.5rem" }}>
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
							fontSize: "1rem",
						}}>
						{menuItems.map((item, index) => (
							<Link
								key={index}
								sx={{ ...linkStyles, marginLeft: "2rem" }}
								href={item.link}>
								{item.label}
							</Link>
						))}
						{/* Profile section*/}
						<Box
							sx={{
								marginLeft: "2rem",
								display: "flex",
								padding: "10px",
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
							<Link
								sx={{ ...linkStyles, marginLeft: "10px", height: "20px" }}
								href="#">
								Login
							</Link>
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
									<Link sx={{ ...linkStyles }} href={item.link}>
										{item.label}
									</Link>
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
									<Link
										sx={{
											...linkStyles,
											marginLeft: "0.625rem",
											height: "40px",
										}}
										href="#">
										Login
									</Link>
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
