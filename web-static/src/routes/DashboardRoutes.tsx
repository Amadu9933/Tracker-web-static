import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FormProvider } from '../../src/context/CreateAccountFormContext';
import Dashboard from '@components/pages/BusinessOwnerPages/dashboard/Dashboard';

// Lazy load components
const DashboardMain = lazy(() => import('@components/pages/BusinessOwnerPages/dashboard/DashboardMain'));
const Report = lazy(() => import('@components/pages/BusinessOwnerPages/dashboard/report/Report'));
const GenerateTrackingID = lazy(() => import('@components/pages/BusinessOwnerPages/manageID/GenerateTrackingID'));
const Logistics = lazy(() => import('@components/pages/BusinessOwnerPages/dashboard/logistics/Logistics'))
const Integration = lazy(() => import('@components/pages/BusinessOwnerPages/dashboard/integration/Integration'))
const UserProfile = lazy(() => import('@components/pages/BusinessOwnerPages/dashboard/userProfile/UserProfile'))

const DashboardRoutes: React.FC = () => (
  <FormProvider>
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />  {/* Redirect to home */}

        {/* Dashboard Layout */}
        <Route path="/" element={<Dashboard />}>
          <Route path="home" element={<DashboardMain />} />
          <Route path="GenerateTrackingID" element={<GenerateTrackingID />} />
          <Route path="reports" element={<Report />} />
          <Route path="logistics" element={<Logistics />} />
          <Route path="integration" element={<Integration />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Route>
      </Routes>
    </Suspense>
  </FormProvider>
);

export default DashboardRoutes;
