// Import necessary dependencies
import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import Logo from "./Logo.png"; // Import the path to your logo image

// Define the type for the NavBar props if any
interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <AppBar className="navbar" position="static">
      <Toolbar
        sx={{ justifyContent: "space-between", backgroundColor: "white" }}
      >
        {/* LOGO */}
        <Box display="flex" alignItems="center" color="#FF833C">
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "20px", marginRight: "6px" }}
          />
          <Typography variant="h7" fontWeight="bold" >
            Trackerr
          </Typography>
        </Box>
        {/* NAVIGATION LINKS */}
        <Box display="flex" alignItems="center">
          <a href="index.html" style={{ margin: "0 10px", color: "#354755" }}>
            Customer
          </a>
          
          
          <a href="index.html" style={{ margin: "0 10px", color: "#354755" }}>
            Business Owner
          </a>
          <a href="index.html" style={{ margin: "0 10px", color: "#354755" }}>
            How it works
          </a>
          
          <a href="index.html" style={{ margin: "0 10px", color: "#354755" }}>
            Track my parcel
          </a>
        </Box>

        {/* LOGIN BUTTON */}
        <Box className="login" display="flex" alignItems="right">
          <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
          <a href="index.html" style={{ margin: "0 6px", color: "#354755", fontSize: "16px"  }}>
            Need help ?
          </a>
          </IconButton>
          <IconButton style={{ color: "#354755", fontSize: "16px" }}>
            Login
              <PersonOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Box
        sx={{ height: "2rem", width: "100%", display: "flex" }}
      >
        <Box sx={{ width: "80%", backgroundColor: "#354755" }}></Box>
        <Box sx={{ width: "20%", backgroundColor: "#D9E1E7" }}></Box>
      </Box>
    </AppBar>
  );
};

export default NavBar;
