import React from 'react';
import { useTheme } from '../../../../../context/ThemeContext';
import CustomizedTables from '../RecentTracking';
import TrackingHistory from '../TrackingHistory';

const Report: React.FC = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`sm:m-[80px] ${isDarkMode ? 'inherit text-white' : 'bg-white text-black'}`}>

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
