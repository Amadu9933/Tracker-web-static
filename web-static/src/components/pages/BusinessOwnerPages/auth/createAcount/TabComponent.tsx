// src/components/TabComponent.tsx
import React, { useState } from 'react';
import TabSelector from './TabSelector';
import FormsContainer from './BuissnessOwnerForms/FormsContainer';
import LogisticInformation from './LogisticInformation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TabComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('business');

  return (
    <div className="text-left max-w-md mx-auto text-left  bg-white shadow-md rounded-lg">
      <h1 className="text-4xl pl-4 text-secondary font-bold mb-3">
        {' '}
        <ArrowBackIcon /> Create account
      </h1>
      {/* Radio Button Selector Component */}
      <div className="pl-4">
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
  );
};

export default TabComponent;
