import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CircularProgress from '@components/pages/customerPages/CustomerTrackingDetails/CustomerNotification/CircularProgress';
import { FormProvider } from '../../src/context/CreateAccountFormContext';
import { NotFound } from '@components/pages/ErrorPages';

// Lazy loading public components
const Ship = lazy(() => import('@components/NavigationBarLinksComponents/Ship'));
const LogisticSolution = lazy(() => import('@components/pages/Logistics/LandingPage'));
const NeedHelp = lazy(() => import('@components/NavigationBarLinksComponents/NeedHelp'));
const Login = lazy(() => import('@components/NavigationBarLinksComponents/Login'));
const TabComponent = lazy(() => import('@components/pages/BusinessOwnerPages/auth/createAcount/TabComponent'));
const PersonalInfoForm = lazy(() => import('@components/pages/BusinessOwnerPages/auth/createAcount/BuissnessOwnerForms/PersonalInfoForm'))
const CustomerNotification = lazy(() => import('@components/pages/customerPages/CustomerTrackingDetails/CustomerNotification/CustomerNotification'));
const BuissnessInfoForm = lazy(() => import('@components/pages/BusinessOwnerPages/auth/createAcount/BuissnessOwnerForms/BuisnessInfoContainer'))
const SetProfileImagePage = lazy(() => import('@components/pages/BusinessOwnerPages/auth/createAcount/BuissnessOwnerForms/SetProfileImagePage'))
const CustomerTrackingDetailLayout = lazy(
  () =>
    import(
      '@components/pages/customerPages/CustomerTrackingDetails/CustomerTrackingDetailLayout'
    )
);
const Otp = lazy(() => import('@components/pages/BusinessOwnerPages/auth/resetPassword/otp'))
const ResetPassword = lazy(() => import('@components/pages/BusinessOwnerPages/auth/resetPassword/resetPassword'))
const ForgotPassword = lazy(() => import('@components/pages/BusinessOwnerPages/auth/resetPassword/forgotPassword'))

const Pricing = lazy(
  () =>
    import(
      '@components/pages/pricingPage/SubscriptionType'
    )
);
const Career = lazy(() => import('@components/common/footer/links/Career'));
const HowItWorks = lazy(() => import('@components/common/footer/links/HowItWorks'));
const Legal = lazy(() => import('@components/common/footer/links/Legal'));
const PrivacyPolicy = lazy(() => import('@components/common/footer/links/PrivacyPolicy'));
const RefundPolicy = lazy(() => import('@components/common/footer/links/Refund'));
const TrackYourOrder = lazy(() => import('@components/common/footer/links/TrackYourOrder'));
const Feedback = lazy(() => import('@components/common/footer/links/Feedback'));
const ContactUs = lazy(() => import('@components/common/footer/links/ContactUs'));
const CustomerService = lazy(() => import('@components/common/footer/links/CustomerService'));
const TermsAndCondition = lazy(() => import('@components/common/footer/links/TermsAndCondition'));

const MainRoutes: React.FC = () => (
  <FormProvider>
    <Suspense fallback={<CircularProgress />}>

      <Routes>
        {/* Public Routes */}
        <Route path="logistic-solution" element={<LogisticSolution />} />
        <Route path="ship" element={<Ship />} />

        <Route path="need-help" element={<NeedHelp />} />
        <Route path="login" element={<Login />} />
        <Route path="business-info" element={<BuissnessInfoForm />} />
        <Route path="set-profile" element={<SetProfileImagePage />} />
        <Route path="otp" element={<Otp />} />
        <Route path="reset-password/:otp" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="career" element={<Career />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="legal" element={<Legal />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="refund-policy" element={<RefundPolicy />} />
        <Route path="track-your-order" element={<TrackYourOrder />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="customer-service" element={<CustomerService />} />
        <Route path="terms-and-condition" element={<TermsAndCondition />} />

        <Route path="sign-up" element={<TabComponent renderTabContent={() => <PersonalInfoForm />} />} />

        <Route
          path="customer-notification/:paramEmail"
          element={<CustomerNotification />}
        />
        <Route
          path="tracking/:trackingNumber"
          element={<CustomerTrackingDetailLayout />}
        />
        {/* Include Dashboard Routes here */}

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </FormProvider >
);

export default MainRoutes;
