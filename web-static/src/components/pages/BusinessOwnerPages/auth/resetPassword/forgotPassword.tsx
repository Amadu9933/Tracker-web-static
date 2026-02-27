import React, { useState } from 'react';
import axios from 'axios'; // ✅ Import Axios
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST; // ✅ Use environment variable for base URL

// Validation schema using Yup
const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
});

// Define form data type
interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'business' | 'logistics'>('business');
  const navigate = useNavigate();
  const [showMsg, setShowMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(emailSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await axios.post(`${TRACKERR_HOST}/users/reset-password/`, {
        email: data.email,
        type: activeTab,
      }, {
        timeout: 30000, // Increase timeout to 30 seconds
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTimeout(() => {
        setShowMsg(response.data.message || `Check your email for an otp ✅`);
        setTimeout(() => {
          setShowMsg("")
          navigate('/otp', { state: { email: data.email } });
        }, 4000)
      }, 1000)
    } catch (error: any) {
      console.error('API Error:', error);
      const errMsg = error.response?.data?.detail.toLowerCase() === "no user matches the given query."
      if (errMsg) {
        setTimeout(() => {
          setErrorMsg(`Email address not found! ❌🥹`);
          setTimeout(() => {
            setErrorMsg("")
          }, 7000)
        }, 2000)
      }
    }

  };

  return (
    <>
      <div className="px-4 sm:px-8 pt-8 sm:pt-16 bg-gray-300 rounded-lg w-full sm:w-[80%] md:w-[60%] h-auto sm:h-[450px] text-left mx-auto my-4">
        {/* Title Section */}
        <h1 className="text-base sm:text-lg font-bold text-gray-700 flex mb-6">
          <div onClick={() => navigate(-1)}> <ArrowBackIcon className="mr-3" /></div>

          Forgot Password
        </h1>

        {/* Tabs */}
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="business"
            name="tab"
            value="business"
            checked={activeTab === 'business'}
            onChange={() => setActiveTab('business')}
            className="mr-2 accent-black"
          />
          <label htmlFor="business" className="mr-4 font-medium">
            Business
          </label>

          <input
            type="radio"
            id="logistics"
            name="tab"
            value="logistics"
            checked={activeTab === 'logistics'}
            onChange={() => setActiveTab('logistics')}
            className="mr-2 accent-black"
          />
          <label htmlFor="logistics" className="font-medium">
            Logistics
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-sm mb-4">
            Enter email address used to create account. A temporary password will
            be sent to your mail to enable you reset your password.
          </h2>

          <div className="mb-4">
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="abc@gmail.com"
              className={`mt-1 block w-full placeholder-[#A3A38E] p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="flex justify-center items-center font-bold text-secondary mt-4"
          >
            <span className="mr-2">Next</span>
            <ArrowForwardIcon sx={{ height: 16 }} />
          </button>
        </form>
        <p className='text-center'>{errorMsg}</p>
        <p className='text-center'>{showMsg}</p>
      </div>
    </>
  );
};

export default ForgotPassword;
