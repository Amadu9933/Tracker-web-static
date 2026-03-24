import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import './Navbar.css';
import { useLocation } from "react-router-dom";
import { logo, profileIcon } from '../../../assets/asset';
import { motion } from "framer-motion";
import ThemeToggle from '../ThemeToggle';
import { useTheme } from '../../../context/ThemeContext';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { isDarkMode } = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const linkStyles = {
    color: '#B1B2B2',
    textDecoration: 'none',
  };

  const menuItems = [
    { label: 'Track my parcel', link: '/' },
    { label: 'Ship', link: '/Ship' },
    { label: 'Logistics solution', link: '/LogisticSolution' },
    { label: 'Need help ?', link: '/NeedHelp' },
  ];

  const location = useLocation();

  if (location.pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-0 md:px-7 dark:bg-[#303030]"
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: isDarkMode ? 'background.paper' : 'white',
          borderColor: 'divider',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>

          {/* Logo — desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ flexGrow: 1 }}
            className="hidden md:flex"
          >
            <img src={logo} alt="Logo" className="nav-logo" />
          </motion.div>

          {/* Nav links — desktop */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex', lg: 'flex' },
              alignItems: 'center',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.4 }}
              >
                <NavLink
                  className="Navbar"
                  to={item.link}
                  style={{ color: '#B1B2B2', marginLeft: '2rem' }}
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}

            {/* Login button */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + menuItems.length * 0.08, duration: 0.4 }}
            >
              <Box
                sx={{
                  marginLeft: '2rem',
                  display: 'flex',
                  border: '1px solid #B1B2B2',
                  borderRadius: '5px',
                  height: '40px',
                  justifyContent: 'space-between',
                  padding: '9px',
                }}
              >
                <div className="flex h-8">
                  <img
                    src={profileIcon}
                    alt="profile-icon"
                    style={{
                      height: '20px',
                      width: '20px',
                      filter: isDarkMode ? 'brightness(0) invert(1)' : 'none'
                    }}
                  />
                  <NavLink
                    className="Navbar"
                    style={{ color: '#B1B2B2', marginLeft: '10px', marginTop: '-3px', height: '20px' }}
                    to="/Login"
                  >
                    Login
                  </NavLink>
                </div>
              </Box>
            </motion.div>

            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (menuItems.length + 1) * 0.08, duration: 0.4 }}
            >
              <ThemeToggle />
            </motion.div>
          </Box>

          {/* Logo — mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ flexGrow: 1 }}
            className="flex  md:hidden"
          >
            <img src={logo} alt="Logo" className="nav-logo" />
          </motion.div>

          {/* Mobile menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                color: isDarkMode ? 'white' : 'inherit',
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <MenuItem onClick={handleClose}>
                <CloseIcon sx={{ color: isDarkMode ? 'white' : 'inherit' }} />
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
                    display: 'flex',
                    padding: '0.625rem',
                    border: '1px solid #B1B2B2',
                    borderRadius: '5px',
                    height: '40px',
                    justifyContent: 'space-between',
                  }}
                >
                  <img
                    src={profileIcon}
                    alt="profile-icon"
                    style={{
                      height: '20px',
                      width: '20px',
                      filter: isDarkMode ? 'brightness(0) invert(1)' : 'none'
                    }}
                  />
                  <NavLink
                    className="Navbar"
                    style={{ ...linkStyles, marginLeft: '0.625rem', height: '40px', marginRight: '10px' }}
                    to="/Login"
                  >
                    Login
                  </NavLink>
                </Box>
              </MenuItem>
              <MenuItem>
                <ThemeToggle />
              </MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;