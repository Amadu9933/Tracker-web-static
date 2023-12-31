// Navbar.tsx
import React from 'react';
import './Navbar.css'
import logo from '../../../assets/Logo.png'


const Navbar: React.FC = () => {
  return (
    <nav className="nav bg-black text-black flex justify-between items-center">
      <div className="text-2xl font-bold "><img src={logo} alt="Logo" className="nav-logo" /></div>
      <div className="flex ">
        <div className="nav-customer mr-4 cursor-pointer">Customer</div>
        <div className="nav-business cursor-pointer">Business Owner</div>
      </div>
    </nav>
  );
};

export default Navbar;
