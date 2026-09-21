import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './Layout'; // Common layout (Navbar, Footer)
import MainRoutes from './MainRoute'; // Public routes
import CustomerRoutes from './CustomerRoutes'; // Customer-specific routes
import ProtectedRoute from './ProtectedRoute'; // Route protection logic
import DashboardRoutes from './DashboardRoutes'; // Dashboard routes
import UserRoute from './UserRoute'; // User-specific routes
import TrackYourParcel from '@components/NavigationBarLinksComponents/TrackYourParcel';
import CircularProgress from '@components/pages/customerPages/CustomerTrackingDetails/CustomerNotification/CircularProgress';

const Loading = () => <CircularProgress />;

const pageTitles: Record<string, string> = {
  '/': 'Track Your Parcel',
  '/login': 'Login',
  '/ship': 'Ship',
  '/logistic-solution': 'Logistics Solution',
  '/need-help': 'Need Help',
  '/pricing': 'Pricing',
  '/career': 'Career',
  '/how-it-works': 'How It Works',
  '/legal': 'Legal',
  '/privacy-policy': 'Privacy Policy',
  '/refund-policy': 'Refund Policy',
  '/track-your-order': 'Track Your Order',
  '/feedback': 'Contact Us',
  '/contact-us': 'Contact Us',
  '/terms-and-condition': 'Terms and Conditions',
  '/sign-up': 'Create Account',
  '/business-info': 'Business Information',
  '/set-profile': 'Set Profile',
  '/otp': 'Verification',
  '/forgot-password': 'Forgot Password',
  '/customer': 'Customer Tracking',
  '/dashboard/home': 'Dashboard',
  '/dashboard/generate-tracking-id': 'Generate Tracking ID',
  '/dashboard/reports': 'Reports',
  '/dashboard/logistics': 'Logistics',
  '/dashboard/integration': 'Integration',
  '/dashboard/user-profile': 'User Profile',
  '/dashboard/how-to-use': 'How To Use',
};

const RouteTitle: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const exactTitle = pageTitles[pathname];
    const fallbackTitle = pathname.startsWith('/dashboard/')
      ? 'Dashboard'
      : pathname.startsWith('/tracking/')
        ? 'Tracking Details'
        : pathname.startsWith('/customer-notification/')
          ? 'Customer Notification'
          : 'Page Not Found';

    document.title = `Trackerr | ${exactTitle ?? fallbackTitle}`;
  }, [pathname]);

  return null;
};

const AppRoutes: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <RouteTitle />
    <Routes>
      {/* 🔹 Public Pages (Inside Layout) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<TrackYourParcel />} />
        <Route path="/*" element={<MainRoutes />} />
        <Route path="customer/*" element={<CustomerRoutes />} />
        <Route element={<ProtectedRoute />}>
          <Route path="user/*" element={<UserRoute />} />
        </Route>
      </Route>

      {/* 🔹 Move Dashboard Outside Layout (No Navbar/Footer) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
