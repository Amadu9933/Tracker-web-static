// src/routes/MainRoutes.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CircularProgress from '@components/pages/customerPages/customerTrackingDetails/customerNotification/Data';
import { FormProvider } from '../../src/context/CreateAccountFormContext';
import DashboardRoutes from './DashboardRoutes'; // Ensure DashboardRoutes is imported

// Lazy loading public components
const Ship = lazy(() => import('@components/navigationBarLinksComponents/Ship'));
const LogisticSolution = lazy(() => import('@components/navigationBarLinksComponents/LogisticSolution'));
const Intergration = lazy(() => import('@components/navigationBarLinksComponents/Intergration'));
const NeedHelp = lazy(() => import('@components/navigationBarLinksComponents/NeedHelp'));
const Login = lazy(() => import('@components/navigationBarLinksComponents/Login'));
// ... other lazy-loaded components

const MainRoutes: React.FC = () => (
  <FormProvider>
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        {/* Public Routes */}
        <Route path="LogisticSolution" element={<LogisticSolution />} />
        <Route path="Ship" element={<Ship />} />
        <Route path="Intergration" element={<Intergration />} />
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
