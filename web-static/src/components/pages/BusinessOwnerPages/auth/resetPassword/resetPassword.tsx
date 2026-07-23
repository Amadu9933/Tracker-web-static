import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Toast from '@components/common/reusable/Toast';
import { CircularProgress } from '@mui/material';

const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST; // Use environment variable for base URL

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

  const [errorMsg, setErrorMsg] = useState('')
  const [ShowMsg, setShowMsg] = useState('')
  const [clicked, setClicked] = useState(false);

  const onSubmit = async (data: ResetPasswordFormData) => {

    setClicked(!clicked);
    try {
      const payload = {
        otp,
        password1: data.password1,
        password2: data.password2,
      };
      console.log('paylaod:', payload);



      const response = await axios.post(`${TRACKERR_HOST}/users/update-password/`, payload);

      console.log('Response:', response.data);
      // alert('Your password has been successfully reset!')
      setTimeout(() => {
        setShowMsg('Password reset successful ✅')
        setTimeout(() => {
          setShowMsg('');
        }, 6000)
        setTimeout(() => {
          navigate('/login');
        }, 3000)
      }, 1000)

    } catch (error: any) {
      console.error('Reset password failed:', error);
      setClicked(false);
      setTimeout(() => {
        setErrorMsg(error?.response?.data?.error.toLowerCase() === 'otp does not exist' ? "Invalid otp ❌" : error?.response?.data?.error.toLowerCase())
        setTimeout(() => {
          setErrorMsg('')
        }, 6000)
      }, 1000)

    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 sm:space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-md mt-8 sm:mt-0">
          {/* Title Section */}
          <div className="text-center">
            <h1 className="text-base sm:text-lg font-bold text-gray-700 flex items-center justify-center mb-6">
              <div onClick={() => navigate(-1)} className="cursor-pointer mr-3">
                <ArrowBackIcon />
              </div>
              Reset Password
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center mr-6">
              <input
                type="radio"
                id="business"
                name="tab"
                value="business"
                checked={activeTab === 'business'}
                onChange={() => setActiveTab('business')}
                className="mr-2 accent-primary"
              />
              <label htmlFor="business" className="font-medium">
                Business
              </label>
            </div>

            {/* <div className="flex items-center">
              <input
                type="radio"
                id="logistics"
                name="tab"
                value="logistics"
                checked={activeTab === 'logistics'}
                onChange={() => setActiveTab('logistics')}
                className="mr-2 accent-primary"
              />
              <label htmlFor="logistics" className="font-medium">
                Logistics
              </label>
            </div> */}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="password1" className="block font-medium text-gray-700 text-center mb-2">
                New Password
              </label>
              <input
                id="password1"
                type="password"
                {...register('password1')}
                placeholder="Enter new password"
                className={`w-full p-3 border rounded-md focus:ring-primary focus:border-primary ${errors.password1 ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.password1 && (
                <p className="text-red-500 text-sm mt-1 text-center">{errors.password1.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password2" className="block font-medium text-gray-700 text-center mb-2">
                Confirm Password
              </label>
              <input
                id="password2"
                type="password"
                {...register('password2')}
                placeholder="Confirm new password"
                className={`w-full p-3 border rounded-md focus:ring-primary focus:border-primary ${errors.password2 ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.password2 && (
                <p className="text-red-500 text-sm mt-1 text-center">{errors.password2.message}</p>
              )}
            </div>

            <div className="flex justify-center">

              {
                !clicked && (
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-md transition-colors"
                  >
                    Reset Password
                  </button>
                )
              }

              {
                clicked && (
                  <CircularProgress sx={{ height: 5 }} />
                )
              }

            </div>
            {errorMsg && (
              <Toast message={errorMsg} type="error" onClose={() => setErrorMsg('')} autoDismiss={6000} />
            )}
          </form>
        </div>
        {ShowMsg && (
          <Toast message={ShowMsg} type="success" onClose={() => setShowMsg('')} autoDismiss={6000} />
        )}
      </div>
    </>
  );
};

export default ResetPassword;
