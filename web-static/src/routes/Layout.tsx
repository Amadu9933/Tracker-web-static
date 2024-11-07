import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@components/common/header/Navbar';

const Layout: React.FC = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      {/* Wrap the main content with Suspense for lazy-loaded routes */}
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          {/* Outlet will render the active route */}
          <Outlet />
        </Suspense>
      </main>

      {/* Optional footer if needed */}
      <footer>

      </footer>
    </>
  );
};

export default Layout;
