// src/routes/CustomerRoutes.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const CustomerLandingPage = lazy(() => import('@components/pages/customerPages/CustomerLandingPage'));
const CustomerTrackingDetailLayout = lazy(() => import('@components/pages/customerPages/CustomerTrackingDetails/CustomerTrackingDetailLayout'));
const CustomerNotification = lazy(() => import('@components/pages/customerPages/CustomerTrackingDetails/CustomerNotification/CustomerNotification'));

const CustomerRoutes: React.FC = () => (
  <Suspense fallback={<div>Loading customer page...</div>}>
    <Routes>
      <Route path="" element={<CustomerLandingPage />} />
      <Route path="tracking/:trackingNumber" element={<CustomerTrackingDetailLayout />} />
      <Route path="customer-notification/:email" element={<CustomerNotification />} />
    </Routes>
  </Suspense>
);

export default CustomerRoutes;
