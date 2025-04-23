import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { FormProvider } from '../../src/context/CreateAccountFormContext';

// Lazy loading public components
const Ship = lazy(() => import('@components/navigationBarLinksComponents/Ship'));
const LogisticSolution = lazy(() => import('@components/navigationBarLinksComponents/LogisticSolution'));
const Intergration = lazy(() => import('@components/navigationBarLinksComponents/Intergration'));
const NeedHelp = lazy(() => import('@components/navigationBarLinksComponents/NeedHelp'));
const Login = lazy(() => import('@components/navigationBarLinksComponents/Login'));
const TabComponent = lazy(() => import('@components/pages/BusinessOwnerPages/auth/createAcount/TabComponent'));
const PersonalInfoForm = lazy(() => import('@components/pages/BusinessOwnerPages/auth/createAcount/BuissnessOwnerForms/PersonalInfoForm'))
const CustomerNotification = lazy(() => import('@components/pages/customerPages/customerTrackingDetails/customerNotification/CustomerNotification'));
const BuissnessInfoForm = lazy(() => import('@components/pages/BusinessOwnerPages/auth/createAcount/BuissnessOwnerForms/BuisnessInfoContainer'))
const SetProfileImagePage = lazy(() => import('@components/pages/BusinessOwnerPages/auth/createAcount/BuissnessOwnerForms/SetProfileImagePage'))
const CustomerTrackingDetailLayout = lazy(
  () =>
    import(
      '@components/pages/customerPages/customerTrackingDetails/CustomerTrackingDetailLayout'
    )
);
const Otp = lazy(() => import('@components/pages/BusinessOwnerPages/auth/resetPassword/otp'))
const ResetPassword = lazy(() => import('@components/pages/BusinessOwnerPages/auth/resetPassword/resetPassword'))
const ForgotPassword = lazy(() => import('@components/pages/BusinessOwnerPages/auth/resetPassword/forgotPassword'))



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
        <Route path="business-info" element={<BuissnessInfoForm />} />
        <Route path="set-profile" element={<SetProfileImagePage />} />
        <Route path="otp" element={<Otp />} />
        <Route path="reset-password/:otp" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />


        <Route path="sign-up" element={<TabComponent renderTabContent={() => <PersonalInfoForm />} />} />

        <Route
          path="customer-notification/:paramEmail"
          element={<CustomerNotification />}
        />
        <Route
          path="tracking/:trackingNumber"
          element={<CustomerTrackingDetailLayout />}
        />
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
