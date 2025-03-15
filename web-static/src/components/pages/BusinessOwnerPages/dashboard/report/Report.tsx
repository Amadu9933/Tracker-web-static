import React from 'react';
import CustomizedTables from '../RecentTracking';
import TrackingHistory from '../TrackingHistory';

const Report: React.FC = () => {




    return (
        <div className="m-[80px]">

            <div className=" mb-2 mt-10 text-left">
                <p className="text-secondary font-bold">Recent </p>
            </div>
            <div>
                <CustomizedTables limit={5} />
            </div>

            <div className='mt-10'>
                <TrackingHistory />
            </div>
        </div>
    );
};

export default Report;
