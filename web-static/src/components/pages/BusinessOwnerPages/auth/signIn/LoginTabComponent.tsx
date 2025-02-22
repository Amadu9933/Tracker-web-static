import React, { useState } from 'react';
import { carryParcel } from '../assets/Assets'; // Ensure correct image path
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginForm from './LoginForm';

const LoginTabComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'business' | 'logistics'>('business');

  return (
    <div className="flex  md:flex-row h-full w-screen  ">
      <div className=' w-2/5'>
        <img
          src={carryParcel}
          alt="Login Illustration"
          className="h-full  w-full"
        />
      </div>

      <div className=" md:w-3/5 w-full h-screen flex flex-col justify-start px-8 md:px-32">

        <div className="mb-6 ">
          <h1 className="mb-3 text-3xl font-bold text-secondary flex items-center">
            <ArrowBackIcon className="mr-3 cursor-pointer hover:text-primary transition duration-300" />
            Welcome Back
          </h1>

        </div>
        {/* Tabs */}
        <div className="flex -ml-2 mb-2 items-center ">
          <label className="flex pl-2 mr-6 ">
            <input
              type="radio"
              value="business"
              checked={selectedTab === 'business'}
              onChange={() => setSelectedTab('business')}
              className={selectedTab === 'business' ? 'accent-black' : ''}
            />
            <p className="pl-2">Business Owner</p>
          </label>
          <label className="flex pl-2 ">
            <input
              type="radio"
              value="logistic"
              checked={selectedTab === 'logistics'}
              onChange={() => setSelectedTab('logistics')}
              className="accent-black"
            />
            <p className="pt-0.5 pl-2">Logistic Partner</p>
          </label>
        </div>

        {/* Form or Logistics Info */}
        <div className=''>
          {selectedTab === 'business' ? (
            <LoginForm /> // Business Login Form
          ) : (
            <div className=" p-6 bg-gray-100 rounded-lg shadow-sm">
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
