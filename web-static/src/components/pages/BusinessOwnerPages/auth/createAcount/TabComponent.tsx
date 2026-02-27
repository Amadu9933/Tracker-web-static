// src/components/BusinessTabComponent.tsx
import React, { useState } from 'react';
import TabSelector from './TabSelector';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createAccont } from '../assets/Assets';
import { useNavigate } from 'react-router-dom';
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
    <div className="flex bg-white flex-col md:flex-row h-screen">
      {/* Left Image Section */}
      <div className="hidden md:block md:w-1/2 h-1/2 md:h-[900px] bg-cover bg-white bg-center">
        <img
          src={createAccont}
          alt="Create Account"
          className="-ml-16 w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full mt-20 sm:mt-40 md:mt-80 md:w-1/2 bg-white pt-8 sm:pt-16 md:pt-20 p-4 sm:p-6 md:p-12 rounded-lg flex flex-col justify-center">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 flex items-center mb-6">
            <div onClick={() => { navigate(-1) }}><ArrowBackIcon className="mr-3" /></div>
            Create Account
          </h1>

        </div>

        {/* Tab Selector */}
        <TabSelector selectedTab={selectedTab} onTabChange={setSelectedTab} />



        {/* Tab Content */}
        <div className="text-left mt-6 mr-20">
          {renderTabContent(selectedTab)}
        </div>
      </div>
    </div>
  );
};

export default BusinessTabComponent;
