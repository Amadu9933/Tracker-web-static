import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CircularProgress from '@components/pages/customerPages/customerTrackingDetails/customerNotification/Data';
import { FormProvider } from '../../src/context/CreateAccountFormContext';

// Lazy loading public components
const Ship = lazy(() => import('@components/navigationBarLinksComponents/Ship'));
const LogisticSolution = lazy(() => import('@components/navigationBarLinksComponents/LogisticSolution'));
const Intergration = lazy(() => import('@components/navigationBarLinksComponents/Intergration'));
const NeedHelp = lazy(() => import('@components/navigationBarLinksComponents/NeedHelp'));
const Login = lazy(() => import('@components/navigationBarLinksComponents/Login'));
const BuisnessInfoContainer = lazy(() =>
  import('@components/pages/businessOwnerPages/auth/createAcount/BuissnessOwnerForms/BuisnessInfoContainer')
);
const LoginForm = lazy(() =>
  import('@components/pages/businessOwnerPages/auth/signIn/loginForm')
);
const SetProfileImagePage = lazy(() =>
  import('@components/pages/businessOwnerPages/auth/createAcount/BuissnessOwnerForms/SetProfileImagePage')
);
const ResetPassword = lazy(() =>
  import('@components/pages/businessOwnerPages/auth/resetPassword/resetPassword')
);
const CustomerTrackingDetailLayout = lazy(() =>
  import('@components/pages/customerPages/customerTrackingDetails/CustomerTrackingDetailLayout')
);

const CustomerNotification = lazy(() =>
  import('@components/pages/customerPages/customerTrackingDetails/customerNotification/CustomerNotification')
);


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
        <Route
          path="tracking/:trackingNumber"
          element={<CustomerTrackingDetailLayout />}
        />
        <Route
          path="customer-notification/:email"
          element={<CustomerNotification />}
        />



        {/* Business Owner Routes */}
        <Route path="/Business-info" element={<BuisnessInfoContainer />} />
        <Route path="/Sign-in" element={<LoginForm />} />
        <Route path="/Set-profile" element={<SetProfileImagePage />} />
        <Route path="/Reset-password" element={<ResetPassword />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/Login" replace />} />

        {/* 404 Fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Suspense>
  </FormProvider>
);

export default MainRoutes;
