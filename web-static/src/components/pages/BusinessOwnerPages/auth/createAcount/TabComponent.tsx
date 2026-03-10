import React, { useState } from 'react';
import TabSelector from './TabSelector';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createAccont } from '../assets/Assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BusinessTabComponentProps {
  initialTab?: string;
  renderTabContent: (selectedTab: string) => React.ReactNode;
}

const BusinessTabComponent: React.FC<BusinessTabComponentProps> = ({
  initialTab = 'business',
  renderTabContent,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>(initialTab);
  const navigate = useNavigate();

  return (
    <div className="flex bg-white flex-col md:flex-row min-h-screen">

      {/* Left image */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block md:w-1/2 h-full"
      >
        <img
          src={createAccont}
          alt="Create Account"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Right form panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center bg-white px-6 sm:px-10 md:px-12 lg:px-16 py-16 md:py-20">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-gray-700 flex items-center gap-2 mb-6"
        >
          <span onClick={() => navigate(-1)} className="cursor-pointer hover:opacity-70 transition">
            <ArrowBackIcon />
          </span>
          Create Account
        </motion.h1>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <TabSelector selectedTab={selectedTab} onTabChange={setSelectedTab} />
        </motion.div>

        {/* Tab content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-left mt-6 w-full max-w-md"
        >
          {renderTabContent(selectedTab)}
        </motion.div>

      </div>
    </div>
  );
};

export default BusinessTabComponent;