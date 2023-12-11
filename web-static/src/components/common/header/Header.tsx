
import React from 'react';
import Navbar from './Navbar';
import HeaderSecond from './HeaderSecondChild';
import LastChild from './HeaderLastChild';

const Header: React.FC = () => {
  return (
    <header className="bg-red-800 text-white p-4">
      {/* Navigation Bar */}
      <Navbar />

      {/* Second Child Component */}
      <HeaderSecond />

      {/* Last Child Component */}
      <LastChild />
    </header>
  );
};

export default Header;
