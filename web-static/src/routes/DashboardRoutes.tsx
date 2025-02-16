// src/routes/DashboardRoutes.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@components/pages/BusinessOwnerPages/dashboard/DashboardLayout';
import { FormProvider } from '../../src/context/CreateAccountFormContext';

// Lazy load dashboard components

const Dashboard = lazy(
  () => import('@components/pages/BusinessOwnerPages/dashboard/Dashboard')
);

const DashboardRoutes: React.FC = () => (
  <FormProvider>
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
  </FormProvider>
);

export default DashboardRoutes;
