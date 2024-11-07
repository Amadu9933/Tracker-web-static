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

const MainRoutes: React.FC = () => (
  <Suspense fallback={<CircularProgress />}>
    <Routes>
      <Route path="LogisticSolution" element={<LogisticSolution />} />
      <Route path="Ship" element={<Ship />} />
      <Route path="Intergration" element={<Intergration />} />
      <Route path="NeedHelp" element={<NeedHelp />} />
      <Route path="Login" element={<Login />} />
    </Routes>
  </Suspense>
);

export default MainRoutes;
