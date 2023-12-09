// Header.tsx
import React from 'react';
import Navbar from './Navbar';
import HeaderSecond from './HeaderSecondChild'
import LastChild from './HeaderLastChild';

const Header: React.FC = () => {
  return (
    <header className=" bg-red-800 text-white p-4">
      <Navbar />
      <HeaderSecond />
      <LastChild />
    </header>
  );
};

export default Header;
