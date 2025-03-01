import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { FormProvider } from '../../src/context/CreateAccountFormContext';
import DashboardRoutes from './DashboardRoutes';

// Lazy loading public components
const Ship = lazy(() => import('@components/navigationBarLinksComponents/Ship'));
const LogisticSolution = lazy(() => import('@components/navigationBarLinksComponents/LogisticSolution'));
const Intergration = lazy(() => import('@components/navigationBarLinksComponents/Intergration'));
const NeedHelp = lazy(() => import('@components/navigationBarLinksComponents/NeedHelp'));
const Login = lazy(() => import('@components/navigationBarLinksComponents/Login'));
const TabComponent = lazy(() => import('@components/pages/BusinessOwnerPages/auth/createAcount/TabComponent'));
const PersonalInfoForm = lazy(() => import('@components/pages/BusinessOwnerPages/auth/createAcount/BuissnessOwnerForms/PersonalInfoForm'))


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
        <Route path="sign-up" element={<TabComponent renderTabContent={() => <PersonalInfoForm />} />} />

        {/* Include Dashboard Routes here */}

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/Login" replace />} />
        {/* 404 Fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Suspense>
  </FormProvider >
);

export default MainRoutes;
