import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@components/common/header/Navbar';
import CircularProgress from '@components/pages/customerPages/CustomerTrackingDetails/CustomerNotification/CircularProgress';

const Layout: React.FC = () => {
  const location = useLocation();

  // List of paths where the Navbar should be hidden
  const hideNavbarPaths = ['/dashboard'];

  // Check if the current path matches any of the paths to hide Navbar
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark">
      {!shouldHideNavbar && (
        <header>
          <Navbar />
        </header>
      )}

      <main>
        <Suspense fallback={<CircularProgress />}>
          <Outlet />
        </Suspense>
      </main>

      <footer>{/* Optional Footer */}</footer>
    </div>
  )
}

export default Layout;
