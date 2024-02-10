import * as React from "react";

// Importing assets
import profileIcon from "../../../assets/iconoir_profile-circle.png";
import logo from "../../../assets/Logo.png";

//Importing material Ui
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Functional component for the Navigation bar
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

	// JSX structure for the Navigation bar
	return (
		<div>
			{/* Top-level container for the entire Navigation bar */}
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
				{/* Toolbar containing various sections */}
				<Toolbar
					sx={{
						display: "flex",
						padding: "1.5rem",
						justifyContent: "space-between",
					}}>
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
							justifyContent: "space-between",
							fontWeight: 500,
							fontSize: "1rem",
						}}>
						{/* Track my parcel link*/}
						<Link
							color="inherit"
							underline="none"
							arial-aria-label="link"
							sx={{
								color: "#B1B2B2",

								"&:hover": {
									textDecoration: "underline",
									textDecorationColor: "black",
									color: "black",
								},
							}}
							href="#">
							Track my parcel
						</Link>

						{/* Shiping link*/}
						<Link
							color="inherit"
							underline="none"
							arial-aria-label="link"
							sx={{
								color: "#B1B2B2",
								"&:hover": {
									textDecoration: "underline",
									textDecorationColor: "black",
									color: "black",
								},
								marginLeft: "2rem",
							}}
							href="#">
							Ship
						</Link>

						{/* Logistic link*/}
						<Link
							color="inherit"
							underline="none"
							arial-aria-label="link"
							sx={{
								color: "#B1B2B2",
								"&:hover": {
									textDecoration: "underline",
									textDecorationColor: "black",
									color: "black",
								},
								marginLeft: "2rem",
							}}
							href="#">
							Logistics solution
						</Link>

						{/* Integration link*/}
						<Link
							color="inherit"
							underline="none"
							arial-aria-label="link"
							sx={{
								color: "#B1B2B2",
								"&:hover": {
									textDecoration: "underline",
									textDecorationColor: "black",
									color: "black",
								},
								marginLeft: "2rem",
							}}
							href="#">
							Integration
						</Link>

						{/* Need help link*/}
						<Link
							color="inherit"
							underline="none"
							arial-aria-label="link"
							sx={{
								color: "#B1B2B2",
								"&:hover": {
									textDecoration: "underline",
									textDecorationColor: "black",
									color: "black",
								},
								marginLeft: "2rem",
							}}
							href="#">
							Need help ?
						</Link>

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

							{/*Login link */}
							<Link
								color="inherit"
								underline="none"
								arial-aria-label="link"
								sx={{
									color: "#B1B2B2",
									marginLeft: "10px",
									height: "20px",
									"&:hover": {
										textDecorationColor: "black",
										color: "black",
									},
								}}
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
							anchorOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}>
							{/* Menu list */}
							<MenuList>
								{/* close menu click icon */}
								<MenuItem onClick={handleClose}>
									<CloseIcon />
								</MenuItem>

								{/* Track my parcel menu link item */}
								<MenuItem>
									<Link
										color="inherit"
										underline="none"
										arial-aria-label="link"
										sx={{
											color: "#B1B2B2",
											"&:hover": {
												textDecoration: "underline",
												textDecorationColor: "#354755",
												color: "#354755",
											},
										}}
										href="#">
										Track my parcel
									</Link>
								</MenuItem>

								{/* Ship menu link item */}
								<MenuItem>
									<Link
										underline="none"
										arial-aria-label="link"
										sx={{
											color: "#B1B2B2",

											"&:hover": {
												textDecoration: "underline",
												textDecorationColor: "#354755",
												color: "#354755",
											},
											margin: "0px",
										}}
										href="#">
										Ship
									</Link>
								</MenuItem>

								{/* Logistic menu link item */}
								<MenuItem>
									<Link
										color="inherit"
										underline="none"
										arial-aria-label="link"
										sx={{
											color: "#B1B2B2",
											"&:hover": {
												textDecoration: "underline",
												textDecorationColor: "#354755",
												color: "#354755",
											},
										}}
										href="#">
										Logistic
									</Link>
								</MenuItem>

								{/* Solution menu link */}
								<MenuItem>
									<Link
										color="inherit"
										underline="none"
										arial-aria-label="link"
										sx={{
											color: "#B1B2B2",
											"&:hover": {
												textDecoration: "underline",
												textDecorationColor: "#354755",
												color: "#354755",
											},
										}}
										href="#">
										Solution
									</Link>
								</MenuItem>

								{/* Integration menu link item */}
								<MenuItem>
									<Link
										color="inherit"
										underline="none"
										arial-aria-label="link"
										sx={{
											color: "#B1B2B2",
											"&:hover": {
												textDecoration: "underline",
												textDecorationColor: "#354755",
												color: "#354755",
											},
										}}
										href="#">
										Integration
									</Link>
								</MenuItem>

								{/* Need help ? menu link item */}
								<MenuItem>
									<Link
										color="inherit"
										underline="none"
										arial-aria-label="link"
										sx={{
											color: "#B1B2B2",
											"&:hover": {
												textDecoration: "underline",
												textDecorationColor: "#354755",
												color: "#354755",
											},
										}}
										href="#">
										Need help ?
									</Link>
								</MenuItem>

								{/* Profile menu link item */}
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
											className=" hover:bg-gray-400,"
											src={profileIcon}
											alt="profile-icon"
											style={{ height: "20px", width: "20px" }}
										/>
										<Link
											color="inherit"
											underline="none"
											arial-aria-label="link"
											sx={{
												color: "#B1B2B2",
												marginLeft: "0.625rem",
												"&:hover": {
													textDecoration: "underline",
													textDecorationColor: "#354755",
													color: "black",
												},
												height: "40px",
											}}
											href="#">
											login
										</Link>
									</Box>
								</MenuItem>
							</MenuList>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
