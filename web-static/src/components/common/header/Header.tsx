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
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						aria-label="logo"
						sx={{ display: { xs: "none", md: "flex" } }}>
						<img src={logo} alt="Logo" className="nav-logo" />
					</IconButton>
					<Typography component="div" sx={{ flexGrow: 1 }}></Typography>
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<Link
							color="inherit"
							underline="always"
							arial-aria-label="link"
							href="#">
							Link
						</Link>

						<Button color="inherit">Track my parcel</Button>
						<Button color="inherit">Ship</Button>
						<Button color="inherit">Logistics solution</Button>
						<Button color="inherit">Integration</Button>
						<Button color="inherit">Need help ?</Button>
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
								<MenuItem onClick={handleClose}>close</MenuItem>
								<MenuItem>hello</MenuItem>
								<MenuItem>hello</MenuItem>
								<MenuItem>hello</MenuItem>
								<MenuItem>hello</MenuItem>
							</MenuList>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
