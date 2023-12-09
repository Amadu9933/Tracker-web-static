// Header.tsx
import React from 'react';
import Navbar from './Navbar';
import HeaderSecond from './HeaderSecondChild'
import HeaderLastChild from './HeaderLastChild';

const Header: React.FC = () => {
  return (
    <header className=" bg-red-800 text-white p-4">
      <Navbar />
      <HeaderSecond />
      <HeaderLastChild />
    </header>
  );
};

export default Header;
