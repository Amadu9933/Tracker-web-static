import React, { useState } from 'react';
import { carryParcel } from '../assets/Assets'; // Ensure correct image path
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginForm from './LoginForm';

const LoginTabComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'business' | 'logistics'>('business');

  return (
    <div className="flex  md:flex-row h-screen w-screen bg-red-500">
      <div>
        <img
          src={carryParcel}
          alt="Login Illustration"
          className="h-full object-contain"
        />
      </div>

      <div className="md:w-1/2 w-full h-screen flex flex-col justify-center px-8 md:px-12 bg-white shadow-md">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-secondary flex items-center">
            <ArrowBackIcon className="mr-3 cursor-pointer hover:text-primary transition duration-300" />
            Welcome Back
          </h1>
          <p className="text-sm mt-2 text-gray-500">Sign in to continue</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 font-medium rounded-md transition duration-300 ${selectedTab === 'business'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            onClick={() => setSelectedTab('business')}
          >
            Business
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-md transition duration-300 ${selectedTab === 'logistics'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            onClick={() => setSelectedTab('logistics')}
          >
            Logistics
          </button>
        </div>

        {/* Form or Logistics Info */}
        <div>
          {selectedTab === 'business' ? (
            <LoginForm /> // Business Login Form
          ) : (
            <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-3 text-gray-700">Logistics Information</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Logistics involves the detailed coordination of complex
                operations involving people, facilities, and supplies.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginTabComponent;
