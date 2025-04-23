import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Validation schema
const passwordSchema = yup.object().shape({
  password1: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long'),
  password2: yup
    .string()
    .oneOf([yup.ref('password1')], 'Passwords must match')
    .required('Confirm password is required'),
});

// Define form data type
interface ResetPasswordFormData {
  password1: string;
  password2: string;
}

const ResetPassword: React.FC = () => {
  const { otp } = useParams(); // 👈 get OTP from the URL
  const navigate = useNavigate()
  console.log('OTP:', otp); // Make sure it's not undefined

  const [activeTab, setActiveTab] = useState<'business' | 'logistics'>('business');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const payload = {
        otp,
        password1: data.password1,
        password2: data.password2,
      };
      console.log('paylaod:', payload);



      const response = await axios.post('https://trackerr.live/api/v1/users/update-password/', payload);

      console.log('Response:', response.data);
      alert('Your password has been successfully reset!');

    } catch (error: any) {
      console.error('Reset password failed:', error);
      alert('An error occurred while resetting password.');

    }
  };

  return (
    <div className="px-[10%] pt-16 bg-gray-300 rounded-lg w-[60%] h-[450px] text-left mx-auto">
      <h1 className="text-lg font-bold text-gray-700 flex mb-6">
        <ArrowBackIcon className="mr-3" />
        Reset Password
      </h1>

      <div className="flex items-center mb-4">
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
        <label htmlFor="logistics" className="font-medium">
          Logistics
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="password1" className="block font-medium text-gray-700">
            New Password
          </label>
          <input
            id="password1"
            type="password"
            {...register('password1')}
            placeholder="Enter new password"
            className={`mt-1 block w-full p-2 border rounded-md ${errors.password1 ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.password1 && (
            <p className="text-red-500 text-sm mt-1">{errors.password1.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password2" className="block font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="password2"
            type="password"
            {...register('password2')}
            placeholder="Confirm new password"
            className={`mt-1 block w-full p-2 border rounded-md ${errors.password2 ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.password2 && (
            <p className="text-red-500 text-sm mt-1">{errors.password2.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <button type="submit" className="text-white bg-primary px-6 py-2 rounded">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
