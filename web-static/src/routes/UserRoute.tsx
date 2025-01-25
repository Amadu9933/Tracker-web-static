// src/routes/UserRoutes.tsx
import { Suspense } from 'react';

// const Profile = lazy(() => import('../pages/user/Profile'));

const UserRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <Route path="/user/:userId" element={<Profile />} /> */}
    </Suspense>
  );
};

export default UserRoutes;
