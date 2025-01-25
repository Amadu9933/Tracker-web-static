// src/pages/BusinessPage.tsx
import React from 'react';
import BusinessTabComponent from '../TabComponent';
import BuisnessInfoForm from './BuissnessInfoForm';
import LogisticInformation from '../LogisticInformation';

const BuisnessInfoContainer: React.FC = () => {
  const renderTabContent = (selectedTab: string) => {
    switch (selectedTab) {
      case 'business':
        return <BuisnessInfoForm />;
      case 'logistics':
        return <LogisticInformation />;
      default:
        return <div>Select a valid tab.</div>;
    }
  };

  return <BusinessTabComponent renderTabContent={renderTabContent} />;
};

export default BuisnessInfoContainer;
