// src/components/TabComponent.tsx
import React, { useState } from 'react';
import TabSelector from './TabSelector';
import FormsContainer from './BuissnessOwnerForms/FormsContainer';
import LogisticInformation from './LogisticInformation';

const TabComponent: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<string>('business');

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create account</h1>
            {/* Radio Button Selector Component */}
            <TabSelector selectedTab={selectedTab} onTabChange={setSelectedTab} />

            {/* Conditionally render the correct content */}
            <div className="mt-6">
                {selectedTab === 'business' ? <FormsContainer /> : <LogisticInformation />}
            </div>
        </div>
    );
};

export default TabComponent;
