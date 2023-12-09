// Navbar.tsx
import React from 'react';
import './Navbar.css'
import Logo from "./Logo.png";


const NavBar = () => {
  return (
    <nav className="nav bg-black  flex justify-between items-center">
      <div className="text-2xl font-bold flex items-center" >
        <img
          src={Logo}
          alt="Logo"
          style={{ height: "40px", marginRight: "10px" }}
        /><div className="logo-name">Trackker</div>
        
      </div>
      <div className="flex">
        <div className="nav-customer mr-4 cursor-pointer">Customer</div>
        <div className="nav-business cursor-pointer">Business Owner</div>
      </div>
    </nav>
  );
};

export default NavBar;
