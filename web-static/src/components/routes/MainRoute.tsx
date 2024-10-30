// src/routes/MainRoutes.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy loading public components
const TrackYourParcel = lazy(() => import('@components/NavigationBarLinksComponents/TrackYourParcel'));
const Ship = lazy(() => import('@components/NavigationBarLinksComponents/Ship'));
const LogisticSolution = lazy(() => import('@components/NavigationBarLinksComponents/LogisticSolution'));
const Intergration = lazy(() => import('@components/NavigationBarLinksComponents/Intergration'));
const NeedHelp = lazy(() => import('@components/NavigationBarLinksComponents/NeedHelp'));
const Login = lazy(() => import('@components/NavigationBarLinksComponents/Login'));

const MainRoutes: React.FC = () => (
  <Suspense fallback={<div>Loading public page...</div>}>
    <Routes>
    <Route path="" element={<TrackYourParcel />} />
      <Route path="LogisticSolution" element={<LogisticSolution />} />
      <Route path="Ship" element={<Ship />} />
      <Route path="Intergration" element={<Intergration />} />
      <Route path="NeedHelp" element={<NeedHelp />} />
      <Route path="Login" element={<Login />} />
      
    </Routes>
  </Suspense>
);

export default MainRoutes;
