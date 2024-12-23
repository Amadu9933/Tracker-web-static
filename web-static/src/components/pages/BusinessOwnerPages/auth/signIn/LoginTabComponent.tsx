import React, { useState } from 'react';
import LoginForm from './loginForm'; // Import the LoginForm component
import { carryParcel } from '../assets/Assets'; // Replace with the actual path of your image
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LoginTabComponent: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'business' | 'logistics'>('business');

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Login Form Section */}
            <div className="w-1/2 flex flex-col justify-center px-12 bg-white shadow-md">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-secondary flex items-center">
                        <ArrowBackIcon className="mr-3" />
                        Welcome back
                    </h1>
                    <p className="text-sm mt-2 text-gray-500">Sign in to continue</p>
                </div>

                {/* Tabs */}
                <div className="flex mb-6">
                    <label className="mr-6">
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
                <div>
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

            {/* Picture Section */}
            <div className="w-1/2 bg-primary flex items-center justify-center">
                <img
                    src={carryParcel}
                    alt="Login Illustration"
                    className="w-[80%] h-auto object-contain"
                />
            </div>
        </div>
    );
};

export default LoginTabComponent;
