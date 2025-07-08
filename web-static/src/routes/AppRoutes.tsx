import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Common layout (Navbar, Footer)
import MainRoutes from './MainRoute'; // Public routes
import CustomerRoutes from './CustomerRoutes'; // Customer-specific routes
import ProtectedRoute from './ProtectedRoute'; // Route protection logic
import DashboardRoutes from './DashboardRoutes'; // Dashboard routes
import UserRoute from './UserRoute'; // User-specific routes
import TrackYourParcel from '@components/navigationBarLinksComponents/TrackYourParcel';
import CircularProgress from '@components/pages/customerPages/customerTrackingDetails/customerNotification/CircularProgress';

const Loading = () => <CircularProgress />;

const AppRoutes: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      {/* 🔹 Public Pages (Inside Layout) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<TrackYourParcel />} />
        <Route path="/*" element={<MainRoutes />} />
        <Route path="customer/*" element={<CustomerRoutes />} />
        <Route element={<ProtectedRoute />}>
          <Route path="user/*" element={<UserRoute />} />
        </Route>
      </Route>

      {/* 🔹 Move Dashboard Outside Layout (No Navbar/Footer) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
