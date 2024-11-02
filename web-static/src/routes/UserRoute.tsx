// src/routes/UserRoutes.tsx
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

// const Profile = lazy(() => import('../pages/user/Profile'));

const UserRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <Route path="/user/:userId" element={<Profile />} /> */}
    </Suspense>
  );
};

export default UserRoutes;
