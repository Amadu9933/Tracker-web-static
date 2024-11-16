// src/pages/BusinessPage.tsx
import React from 'react';
import BusinessTabComponent from '../TabComponent';
import PersonalInfoForm from './PersonalInfoForm';
import LogisticInformation from '../LogisticInformation';

const CreateAcountForm: React.FC = () => {
  const renderTabContent = (selectedTab: string) => {
    switch (selectedTab) {
      case 'business':
        return <PersonalInfoForm />;
      case 'logistics':
        return <LogisticInformation />;
      default:
        return <div>Select a valid tab.</div>;
    }
  };

  return <BusinessTabComponent renderTabContent={renderTabContent} />;
};

export default CreateAcountForm;
