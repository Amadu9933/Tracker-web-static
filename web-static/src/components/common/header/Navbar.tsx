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

	// Define navigation links
	const links = [
		{ text: "Track my parcel", href: "#" },
		{ text: "Ship", href: "/about" },
		{ text: "Logistics solution", href: "#" },
		{ text: "Integration", href: "#" },
		{ text: "Need help ?", href: "#" },
	];

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

	return (
		<div>
			<AppBar
				position="static"
				sx={{
					display: "flex",
					backgroundColor: "white",
					height: "5rem",
					borderColor: "1px solid #D9E1E7",
					paddingLeft: { sm: "1.5rem", md: "1.5rem", lg: "5rem" },
					paddingRight: { sm: "1.5rem", md: "1.5rem", lg: "5rem" },
				}}>
				<Toolbar
					sx={{
						display: "flex",
						padding: "1.5rem",
						justifyContent: "space-between",
					}}>
					<IconButton
						size="large"
						edge="start"
						aria-label="logo"
						sx={{ flexFlow: 1, display: { xs: "none", md: "flex" } }}>
						<img src={logo} alt="Logo" className="nav-logo" />
					</IconButton>

					<Box
						sx={{
							display: { xs: "none", md: "flex", lg: "flex" },
							alignItems: "center",
							justifyContent: "space-between",
							fontWeight: 500,
							fontSize: "1rem",
						}}>
						{links.map((link, index) => (
							<Link
								key={index}
								sx={{ ...linkStyles, marginLeft: "2rem" }}
								href={link.href}>
								{link.text}
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
							{links.map((link, index) => (
								<MenuItem key={index}>
									<Link sx={{ ...linkStyles }} href={link.href}>
										{link.text}
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
