import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@components/common/header/Navbar';

const Layout: React.FC = () => {
  const location = useLocation();

  // List of paths where the Navbar should be hidden
  const hideNavbarPaths = ['/dashboard'];

  // Check if the current path matches any of the paths to hide Navbar
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && (
        <header>
          <Navbar />
        </header>
      )}

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>

      <footer>{/* Optional Footer */}</footer>
    </>
  );
};

export default Layout;
