import React from 'react';
import CustomizedTables from './RecentTracking';

const TrackingHistory: React.FC = () => {
    return (
        <>
            <CustomizedTables enableFilter={true} enableLoadMore={true} />


        </>
    );
};
export default TrackingHistory;
