// src/routes/UserRoutes.tsx
import { Suspense } from 'react';
import CircularProgress from '@components/pages/customerPages/customerTrackingDetails/customerNotification/CircularProgress';

// const Profile = lazy(() => import('../pages/user/Profile'));

const UserRoutes = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      {/* <Route path="/user/:userId" element={<Profile />} /> */}
    </Suspense>
  );
};

export default UserRoutes;
