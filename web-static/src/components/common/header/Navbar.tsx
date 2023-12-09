// Navbar.tsx
import React from 'react';
import './Navbar.css'


const Navbar: React.FC = () => {
  return (
    <nav className="nav bg-black text-black flex justify-between items-center">
      <div className="text-2xl font-bold ">Logo</div>
      <div className="flex ">
        <div className="nav-customer mr-4 cursor-pointer">Customer</div>
        <div className="nav-business cursor-pointer">Business Owner</div>
      </div>
    </nav>
  );
};

export default Navbar;
