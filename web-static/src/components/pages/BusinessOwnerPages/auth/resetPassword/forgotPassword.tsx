import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
  const [activeTab, setActiveTab] = useState<'business' | 'logistics'>(
    'business'
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(emailSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log(`Reset password for ${data.email} in ${activeTab} tab`);
    alert(`Password reset link sent to ${data.email} for ${activeTab} tab`);
  };

  return (
    <div className="px-[10%] pt-16 bg-gray-300 rounded-lg  w-[60%] h-[450px] text-left mx-auto">
      {/* Title Section */}
      <h1 className="text-lg font-bold text-gray-700 flex  mb-6">
        <ArrowBackIcon className="mr-3" />
        Forgot Password
      </h1>
      <div className="flex items-center   mb-4">
        <input
          type="radio"
          id="business"
          name="tab"
          value="business"
          checked={activeTab === 'business'}
          onChange={() => setActiveTab('business')}
          className="mr-2"
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
          className="mr-2"
        />
        <label htmlFor="logistics" className=" font-medium">
          Logistics
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" ">
        <h2 className="text-sm">
          Enter email address used to create account. A temporary password will
          be sent to your mail to enable you reset your password.
        </h2>

        <div className="mb-4">
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="abc@gmail.com"
            className={`mt-1 block w-full placeholde-[#A3A38E] p-2 border rounded-md ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <Link to="/reset-password" className=" flex justify-center  ">
          <p className=" font-500 font-bold mr-2 -mt-1">Next</p>
          <ArrowForwardIcon sx={{ height: 16 }} />
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
