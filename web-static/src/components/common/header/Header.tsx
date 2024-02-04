import * as React from "react";
import { useState, MouseEvent } from "react";
import logo from "../../../assets/Logo.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import profileIcon from "../../../assets/iconoir_profile-circle.png";
import CloseIcon from "@mui/icons-material/Close";

const Header: React.FC = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<AppBar
				position="static"
				sx={{
					display: "flex",
					backgroundColor: "white",
				}}>
				<Toolbar
					sx={{
						display: "flex",

						justifyContent: "space-between",
					}}>
					<IconButton
						size="large"
						edge="start"
						aria-label="logo"
						sx={{ flexFlow: 1, display: { xs: "none", md: "flex" } }}>
						<img src={logo} alt="Logo" className="nav-logo" />
					</IconButton>

					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<Link
							color="inherit"
							underline="none"
							arial-aria-label="link"
							sx={{
								color: "gray",
								"&:hover": {
									textDecoration: "underline",
									textDecorationColor: "black",
								},
							}}
							href="#">
							Track my parcel
						</Link>
						<Link
							color="inherit"
							underline="none"
							arial-aria-label="link"
							sx={{
								color: "gray",
								"&:hover": {
									textDecoration: "underline",
									textDecorationColor: "black",
								},
								marginLeft: "16px",
							}}
							href="#">
							Ship
						</Link>
						<Link
							color="inherit"
							underline="none"
							arial-aria-label="link"
							sx={{
								color: "gray",
								"&:hover": {
									textDecoration: "underline",
									textDecorationColor: "black",
								},
								marginLeft: "16px",
							}}
							href="#">
							Logistics solution
						</Link>
						<Link
							color="inherit"
							underline="none"
							arial-aria-label="link"
							sx={{
								color: "gray",
								"&:hover": {
									textDecoration: "underline",
									textDecorationColor: "black",
								},
								marginLeft: "16px",
							}}
							href="#">
							Integration
						</Link>
						<Link
							color="inherit"
							underline="none"
							arial-aria-label="link"
							sx={{
								color: "gray",
								"&:hover": {
									textDecoration: "underline",
									textDecorationColor: "black",
								},
								marginLeft: "16px",
							}}
							href="#">
							Need help ?
						</Link>
						<Box
							sx={{
								marginLeft: "16px",
								display: "flex",
								padding: "10px",
								border: "1px solid gray",
								borderRadius: "5px",
							}}>
							<img src={profileIcon} alt="profile-icon" />
							<Link
								color="inherit"
								underline="always"
								arial-aria-label="link"
								sx={{ color: "gray", marginLeft: "10px" }}
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
							<MenuList>
								<MenuItem onClick={handleClose}>
									<CloseIcon />
								</MenuItem>
								<MenuItem>
									<Link
										color="inherit"
										underline="none"
										arial-aria-label="link"
										sx={{
											color: "gray",
											"&:hover": {
												textDecoration: "underline",
												textDecorationColor: "black",
											},
										}}
										href="#">
										Track my parcel
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										underline="none"
										arial-aria-label="link"
										sx={{
											color: "gray",
											marginLeft: "16px",
											"&:hover": {
												textDecoration: "underline",
												textDecorationColor: "black",
											},
											margin: "0px",
										}}
										href="#">
										Ship
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										color="inherit"
										underline="none"
										arial-aria-label="link"
										sx={{
											color: "gray",
											"&:hover": {
												textDecoration: "underline",
												textDecorationColor: "black",
											},
										}}
										href="#">
										Logistic
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										color="inherit"
										underline="none"
										arial-aria-label="link"
										sx={{
											color: "gray",
											"&:hover": {
												textDecoration: "underline",
												textDecorationColor: "black",
											},
										}}
										href="#">
										Solution
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										color="inherit"
										underline="none"
										arial-aria-label="link"
										sx={{ color: "gray" }}
										href="#">
										Integration
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										color="inherit"
										underline="none"
										arial-aria-label="link"
										sx={{ color: "gray" }}
										href="#">
										Need help ?
									</Link>
								</MenuItem>
								<MenuItem>
									<Box
										sx={{
											display: "flex",

											padding: "10px",
											border: "1px solid gray",
											borderRadius: "5px",
										}}>
										<img src={profileIcon} alt="profile-icon" />
										<Link
											color="inherit"
											underline="none"
											arial-aria-label="link"
											sx={{ color: "gray", marginLeft: "10px" }}
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

export default Header;
