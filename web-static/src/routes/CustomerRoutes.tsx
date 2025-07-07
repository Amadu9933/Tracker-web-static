// src/routes/CustomerRoutes.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import CircularProgress from '@components/pages/customerPages/customerTrackingDetails/customerNotification/CircularProgress';

const CustomerLandingPage = lazy(
  () => import('@components/pages/customerPages/CustomerLandingPage')
);
const CustomerTrackingDetailLayout = lazy(
  () =>
    import(
      '@components/pages/customerPages/customerTrackingDetails/CustomerTrackingDetailLayout'
    )
);
const CustomerNotification = lazy(
  () =>
    import(
      '@components/pages/customerPages/customerTrackingDetails/customerNotification/CustomerNotification'
    )
);

const CustomerRoutes: React.FC = () => (
  <Suspense fallback={<CircularProgress />}>
    <Routes>
      <Route path="" element={<CustomerLandingPage />} />
      <Route
        path="tracking/:trackingNumber"
        element={<CustomerTrackingDetailLayout />}
      />
      <Route
        path="customer-notification/:email"
        element={<CustomerNotification />}
      />
    </Routes>
  </Suspense>
);

export default CustomerRoutes;
