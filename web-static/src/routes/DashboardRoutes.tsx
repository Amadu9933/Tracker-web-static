import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@components/pages/BusinessOwnerPages/dashboard/DashboardLayout';
import { FormProvider } from '../../src/context/CreateAccountFormContext';

// Lazy load dashboard components
const Dashboard = lazy(() => import('@components/pages/BusinessOwnerPages/dashboard/Dashboard'));
const Report = lazy(() => import('@components/pages/BusinessOwnerPages/dashboard/report/Report')); // Load Report Page
const DashboardMain = lazy((() => import('@components/pages/BusinessOwnerPages/dashboard/DashboardMain')))
const GenerateTrackingID = lazy(() => import('@components/pages/BusinessOwnerPages/manageID/GenerateTrackingID'))

const DashboardRoutes: React.FC = () => (
  <FormProvider>
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <Routes>
        <Route element={<Dashboard />}>
          {/* Redirect /dashboard to /dashboard/home */}


          {/* Main Dashboard Page */}
          <Route path="home" element={<DashboardMain />} />
          <Route path='GenerateTrackingID' element={<GenerateTrackingID />} />
          {/* Report Page Route */}
          <Route path="reports" element={<Report />} />

        </Route>
      </Routes>
    </Suspense>
  </FormProvider>
);

export default DashboardRoutes;
