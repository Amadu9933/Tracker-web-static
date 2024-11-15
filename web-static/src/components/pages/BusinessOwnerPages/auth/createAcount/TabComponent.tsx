// src/components/TabComponent.tsx
import React, { useState } from 'react';
import TabSelector from './TabSelector';
import FormsContainer from './BuissnessOwnerForms/FormsContainer';
import LogisticInformation from './LogisticInformation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createAccont } from '../assets/Assets'

const TabComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('business');

  return (
    <div className='flex  '>
      <div className='  w-[50%]'><img src={createAccont} alt="" className='w-[100%] -ml-12  h-[100%]' /></div>
      <div className="text-left  text-left pt-20 px-12  w-[50%] rounded-lg">

        <h1 className="text-4xl  text-secondary font-bold mb-3">
          {' '}
          <ArrowBackIcon /> Create account
        </h1>
        {/* Radio Button Selector Component */}
        <div className="">
          <TabSelector selectedTab={selectedTab} onTabChange={setSelectedTab} />
        </div>

        {/* Conditionally render the correct content */}
        <div className="">
          {selectedTab === 'business' ? (
            <FormsContainer />
          ) : (
            <LogisticInformation />
          )}
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
