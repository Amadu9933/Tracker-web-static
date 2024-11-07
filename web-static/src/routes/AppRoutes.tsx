// src/routes/AppRoutes.tsx
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Common layout (Navbar, Footer)
import MainRoutes from './MainRoute'; // Public routes
import CustomerRoutes from './CustomerRoutes'; // Customer-specific routes
import ProtectedRoute from './ProtectedRoute'; // Route protection logic
import DashboardRoutes from './DashboardRoutes'; // Dashboard routes
import UserRoute from './UserRoute'; // User-specific routes
import TrackYourParcel from '@components/navigationBarLinksComponents/TrackYourParcel';

const Loading = () => <div>Loading...</div>;

const AppRoutes: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      {/* Layout wraps all routes */}
      <Route path="/" element={<Layout />}>
        {/* Index route for the home page */}
        <Route index element={<TrackYourParcel />} />

        {/* Public routes */}
        <Route path="/*" element={<MainRoutes />} />

        {/* Customer-specific routes */}
        <Route path="customer/*" element={<CustomerRoutes />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Route>

        {/* Protected User-specific Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/user/*" element={<UserRoute />} />
        </Route>
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
