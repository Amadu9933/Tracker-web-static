import React, { useState } from 'react';
import LoginForm from './loginForm'; // Import the LoginForm component
import { createAccont } from '../assets/Assets';// Replace with the actual path of your image
import ArrowBackIcon from '@mui/icons-material/ArrowBack';





const LoginTabComponent: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'business' | 'logistics'>('business');

    return (
        <div className="flex">
            {/* Picture Section */}
            <div className="w-full -ml-20 p-4">
                <img src={createAccont} alt="Business Icon" className="" />
            </div>

            {/* Tabs and Content Section */}
            <div className="w-3/4 p-4">
                <h1 className="text-3xl font-bold text-gray-700 flex items-center mb-6">
                    <ArrowBackIcon className="mr-3" />
                    Create Account
                </h1>


                <p className="text-sm my-5 text-left font-medium text-secondary">Sign in</p>


                {/* Tabs */}
                <div className="flex mb-4">
                    <label className="mr-4">
                        <input
                            type="radio"
                            name="tab"
                            value="business"
                            checked={selectedTab === 'business'}
                            onChange={() => setSelectedTab('business')}
                            className="mr-2"
                        />
                        Business
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="tab"
                            value="logistics"
                            checked={selectedTab === 'logistics'}
                            onChange={() => setSelectedTab('logistics')}
                            className="mr-2"
                        />
                        Logistics
                    </label>
                </div>

                {/* Content */}

                <div className="content">


                    {selectedTab === 'business' ? (
                        <LoginForm /> // Display LoginForm for the Business tab
                    ) : (
                        <div className="p-4 bg-gray-100 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Logistics Information</h2>
                            <p>
                                Logistics involve the detailed coordination of complex operations involving people,
                                facilities, and supplies. This tab can include specific information or features
                                related to logistics.
                            </p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default LoginTabComponent;
