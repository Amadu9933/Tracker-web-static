// src/routes/MainRoutes.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CircularProgress from '@components/pages/customerPages/CustomerTrackingDetails/CustomerNotification/Data';
import { FormProvider } from '../../src/context/CreateAccountFormContext';
import DashboardRoutes from './DashboardRoutes'; // Ensure DashboardRoutes is imported

// Lazy loading public components
const Ship = lazy(
  () => import('@components/NavigationBarLinksComponents/Ship')
);
const LogisticSolution = lazy(
  () => import('@components/NavigationBarLinksComponents/LogisticSolution')
);
const Integration = lazy(
  () => import('@components/NavigationBarLinksComponents/Intergration')
);
// Fixed spelling
const NeedHelp = lazy(
  () => import('@components/NavigationBarLinksComponents/NeedHelp')
);
const Login = lazy(
  () => import('@components/NavigationBarLinksComponents/Login')
);
// ... other lazy-loaded components

const MainRoutes: React.FC = () => (
  <FormProvider>
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        {/* Public Routes */}
        <Route path="LogisticSolution" element={<LogisticSolution />} />
        <Route path="Ship" element={<Ship />} />
        <Route path="Integration" element={<Integration />} />{' '}
        {/* Fixed spelling */}
        <Route path="NeedHelp" element={<NeedHelp />} />
        <Route path="Login" element={<Login />} />
        {/* Include Dashboard Routes here */}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/Login" replace />} />
        {/* 404 Fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Suspense>
  </FormProvider>
);

export default MainRoutes;
