import React, { useEffect, useState } from 'react';
import { carryParcel } from '../assets/Assets';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginForm from './loginForm';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@components/pages/customerPages/CustomerTrackingDetails/CustomerNotification';
import { motion } from 'framer-motion';

const LoginTabComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'business' | 'logistics'>('business');
  const navigate = useNavigate();
  const [checkAuth, setCheckAuth] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('access')) {
      setCheckAuth(true);
      window.location.href = '/dashboard/';
    }
  }, []);

  if (checkAuth) return <CircularProgress />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full border-t border-t-gray-200  md:px-0">

      {/* Left image — desktop only */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block md:w-2/5"
      >
        <img
          src={carryParcel}
          alt="Login Illustration"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Right: form panel */}
      <div className="w-full md:w-3/5 min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 py-16 md:py-0">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="mb-3 text-2xl sm:text-3xl font-bold text-secondary flex items-center gap-2">
            <span onClick={() => navigate(-1)}>
              <ArrowBackIcon className="cursor-pointer transition duration-300 hover:opacity-70" />
            </span>
            Welcome Back
          </h1>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-6 mb-4"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="business"
              checked={selectedTab === 'business'}
              onChange={() => setSelectedTab('business')}
              className={selectedTab === 'business' ? 'accent-black' : ''}
            />
            <p className="text-sm sm:text-base">Business Owner</p>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="logistic"
              checked={selectedTab === 'logistics'}
              onChange={() => setSelectedTab('logistics')}
              className="accent-black"
            />
            <p className="text-sm sm:text-base">Logistic Partner</p>
          </label>
        </motion.div>

        Form or Logistics info
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {selectedTab === 'business' ? (
            <LoginForm />
          ) : (
            <div className="p-5 sm:p-6 bg-gray-100 rounded-lg shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-700">
                Logistics Information
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Logistics involves the detailed coordination of complex
                operations involving people, facilities, and supplies.
              </p>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default LoginTabComponent;