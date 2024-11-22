import React, { useState } from 'react';
import LoginForm from './loginForm'; // Import the LoginForm component
import { carryParcel } from '../assets/Assets';// Replace with the actual path of your image
import ArrowBackIcon from '@mui/icons-material/ArrowBack';





const LoginTabComponent: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'business' | 'logistics'>('business');

    return (
        <div className="flex ">
            {/* Picture Section */}
            <div className="w-full   p-4">
                <img src={carryParcel} alt="Business Icon" className="-ml-5 w-[400px]  h-[550px]" />
            </div>

            {/* Tabs and Content Section */}
            <div className="w-3/4 p-4 pt-10 pl-10 mr-40">
                <h1 className="text-3xl pt-16 font-bold text-secondary flex items-center mb-6">
                    <ArrowBackIcon className="mr-3" />
                    Welcome back
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

                <div className="-ml-5">


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
