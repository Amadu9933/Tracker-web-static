import React, { useEffect } from 'react';

const Integration: React.FC = () => {
    useEffect(() => {
        document.title = 'Integration - Tracker';
    }, []);

    return (
        <div className="sm:m-[80px]">
            <h1 className="text-2xl font-bold">Integration</h1>
            <p className="mt-4 text-gray-600">This section will contain integration tools and settings.</p>
        </div>
    );
};

export default Integration;
