// src/components/BusinessTabComponent.tsx
import React, { useState } from 'react';
import TabSelector from './TabSelector';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createAccont } from '../assets/Assets';

interface BusinessTabComponentProps {
  initialTab?: string;
  renderTabContent: (selectedTab: string) => React.ReactNode;
}

const BusinessTabComponent: React.FC<BusinessTabComponentProps> = ({
  initialTab = 'business',
  renderTabContent,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>(initialTab);

  return (
    <div className="flex bg-white  flex-col md:flex-row h-screen ">
      {/* Left Image Section */}
      <div className="md:w-1/2 h-1/2 md:h-[900px]  bg-cover bg-white bg-center hidden md:block">
        <img
          src={createAccont}
          alt="Create Account"
          className="-ml-16 w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className=" mt-80 md:w-1/2 bg-white pt-20 p-6 md:p-12  rounded-lg flex flex-col justify-center">
        {/* Title Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-700 flex items-center mb-6">
            <ArrowBackIcon className="mr-3" />
            Create Account
          </h1>

        </div>

        {/* Tab Selector */}

        <TabSelector selectedTab={selectedTab} onTabChange={setSelectedTab} />


        <div className='flex justify-between  w-[86%] mt-8 mb-10'>
          <p className='font-medium text-lg'>Personal Information</p>
          <p className='text-[#82826A]  font-medium'>Step 1 of 3</p>
        </div>
        {/* Tab Content */}
        <div className="text-left mt-6 mr-20">
          {renderTabContent(selectedTab)}
        </div>
      </div>
    </div>
  );
};

export default BusinessTabComponent;
