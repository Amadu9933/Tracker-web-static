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
import DeleteAccount from '@components/pages/customerPages/AccountDeletion';
import AffiliateLandingPage from '@components/pages/AffiliatePages/landing/AffiliateLandingPage';
import AffiliateLogin from '@components/pages/AffiliatePages/auth/AffiliateLogin';
import VerifyOTP from '@components/pages/AffiliatePages/auth/VerifyOTP';
import AffiliateLayout from '@components/pages/AffiliatePages/dashboard/AffiliateLayout';
import AffiliateDashboard from '@components/pages/AffiliatePages/dashboard/AffiliateDashboard';
import AffiliateReferrals from '@components/pages/AffiliatePages/dashboard/AffiliateReferrals';
import AffiliateAccountSettings from '@components/pages/AffiliatePages/dashboard/AffiliateAccountSettings';
import AffiliateWithdraw from '@components/pages/AffiliatePages/dashboard/AffiliateWithdraw';
import AffiliateBenefits from '@components/pages/AffiliatePages/benefits/Benefits';

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
  '/delete-account': 'Account Deletion',
  '/forgot-password': 'Forgot Password',
  '/customer': 'Customer Tracking',
  '/dashboard/home': 'Dashboard',
  '/dashboard/generate-tracking-id': 'Generate Tracking ID',
  '/dashboard/reports': 'Reports',
  '/dashboard/logistics': 'Logistics',
  '/dashboard/integration': 'Integration',
  '/dashboard/user-profile': 'User Profile',
  '/dashboard/how-to-use': 'How To Use',
  '/affiliate': 'Affiliate Program',
  '/affiliate/benefits': 'Benefits',
  '/affiliate/login': 'Affiliate Login',
  '/affiliate/signup': 'Affiliate Sign Up',
  '/affiliate/verify-otp': 'Affiliate Verification',
  '/affiliate/dashboard': 'Affiliate Dashboard',
  '/affiliate/dashboard/referrals': 'Affiliate Referrals',
  '/affiliate/dashboard/account': 'Affiliate Account Settings',
  '/affiliate/dashboard/withdraw': 'Affiliate Withdrawals',
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
          : 'Real-Time Delivery';

    document.title = `TrackerrGo | ${exactTitle ?? fallbackTitle}`;
  }, [pathname]);

  return null;
};

const AppRoutes: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <RouteTitle />
    <Routes>
      <Route path="/affiliate" element={<AffiliateLandingPage />} />
      <Route path="/affiliate/login" element={<AffiliateLogin />} />
      <Route path="/affiliate/signup" element={<AffiliateLogin />} />
      <Route path="/affiliate/benefits" element={<AffiliateBenefits />}/>
      <Route path="/affiliate/verify-otp" element={<VerifyOTP />} />
      <Route path="/affiliate/dashboard" element={<AffiliateLayout />}>
        <Route index element={<AffiliateDashboard />} />
        <Route path="referrals" element={<AffiliateReferrals />} />
        <Route path="account" element={<AffiliateAccountSettings />} />
        <Route path="withdraw" element={<AffiliateWithdraw />} />
      </Route>
      {/* 🔹 Public Pages (Inside Layout) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<TrackYourParcel />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
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
