// src/routes/DashboardRoutes.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@components/pages/businessOwnerPages/dashboard/DashboardLayout';

// Lazy load dashboard components
const Dashboard = lazy(() => import('@components/pages/businessOwnerPages/dashboard/Dashboard'));

const DashboardRoutes: React.FC = () => (
  <Suspense fallback={<div>Loading dashboard...</div>}>
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* Define the main dashboard route */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Example of additional nested routes under Dashboard */}
        {/* <Route path="/settings" element={<Settings />} /> */}
        {/* <Route path="/reports" element={<Reports />} />   */}
        
      </Route>
    </Routes>
  </Suspense>
);

export default DashboardRoutes;
