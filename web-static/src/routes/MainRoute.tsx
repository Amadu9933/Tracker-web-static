// src/routes/MainRoutes.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import CircularProgress from '@components/pages/customerPages/customerTrackingDetails/customerNotification/Data';

// Lazy loading public components
const Ship = lazy(
  () => import('@components/navigationBarLinksComponents/Ship')
);
const LogisticSolution = lazy(
  () => import('@components/navigationBarLinksComponents/LogisticSolution')
);
const Intergration = lazy(
  () => import('@components/navigationBarLinksComponents/Intergration')
);
const NeedHelp = lazy(
  () => import('@components/navigationBarLinksComponents/NeedHelp')
);
const Login = lazy(
  () => import('@components/navigationBarLinksComponents/Login')
);
const BuisnessInfoContainer = lazy(
  () => import('@components/pages/businessOwnerPages/auth/createAcount/BuissnessOwnerForms/BuisnessInfoContainer')
);
const LoginForm = lazy(
  () => import('@components/pages/businessOwnerPages/auth/signIn/loginForm')
);
const SetProfileImagePage = lazy(
  () => import('@components/pages/businessOwnerPages/auth/createAcount/BuissnessOwnerForms/SetProfileImagePage')
);

const MainRoutes: React.FC = () => (
  <Suspense fallback={<CircularProgress />}>
    <Routes>
      <Route path="LogisticSolution" element={<LogisticSolution />} />
      <Route path="Ship" element={<Ship />} />
      <Route path="Intergration" element={<Intergration />} />
      <Route path="NeedHelp" element={<NeedHelp />} />
      <Route path="Login" element={<Login />} />
      <Route path="/Business-info" element={<BuisnessInfoContainer />} />
      <Route path="/Sign-in" element={<LoginForm />} />
      <Route path="/Set-profile" element={<SetProfileImagePage />} />

    </Routes>
  </Suspense>
);

export default MainRoutes;
