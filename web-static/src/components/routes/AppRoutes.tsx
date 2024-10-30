// src/routes/AppRoutes.tsx
import React, { Suspense } from 'react';
import {  Routes, Route } from 'react-router-dom';
import Layout from './Layout';  // Common layout component (Navbar, footer)
import MainRoutes from './MainRoute';   // Public routes
import CustomerRoutes from './CustomerRoutes'; // Customer-specific routes
import ProtectedRoute from './ProtectedRoute'; // Route protection logic
import DashboardRoutes from './DashboardRoutes'; // Dashboard routes
import UserRoute from './UserRoute'; // User-specific routes (profile, settings)

const Loading = () => <div>Loading...</div>;

const AppRoutes: React.FC = () => (
  <>

    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Layout wraps all routes */}
        <Route path="/" element={<Layout />}>
          {/* Public routes (e.g., Ship, Login) */}
          <Route path="/" element={<MainRoutes />} />

          {/* Customer-specific routes (e.g., Tracking, Notifications) */}
          <Route path="customer/*" element={<CustomerRoutes />} />
          
          {/* Protected Dashboard routes (e.g., Dashboard, Settings) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
          </Route>

          {/* Protected User-specific routes (e.g., Profile, Settings) */}
          <Route path="/user/*" element={<ProtectedRoute />}>
            <Route path="*" element={<UserRoute />} />
          </Route>

        </Route>
      </Routes>
    </Suspense>
  </>
);

export default AppRoutes;
