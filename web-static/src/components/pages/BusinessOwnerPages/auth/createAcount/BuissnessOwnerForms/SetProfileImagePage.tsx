import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../../../../../context/CreateAccountFormContext';
import axiosInstance from '../../../../../../api/axiosInstance';

import { Group, edit, ArrowBack } from '../../assets/Assets';
import MessageBox from '@components/common/reusable/messageBox';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const SetProfileImagePage: React.FC = () => {
  const { formData } = useFormContext();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;

  useEffect(() => {
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setPreview(null);
    }
  }, [image]);

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) return 'Oops! Please choose a valid image file (like JPG, PNG, or GIF).';
    if (file.size > MAX_FILE_SIZE) return 'Image is too big! Please select a file smaller than 2MB.';
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone_number', formData.phone);
      payload.append('password', formData.password);
      payload.append('business_name', formData.businessName);
      payload.append('service', formData.service);
      payload.append('address', formData.address);
      payload.append('country', formData.country);
      payload.append('account_type', 'business');

      if (image) {
        payload.append('avatar', image);
      }

      let signupEndpoint = `${TRACKERR_HOST}/business-owners/signup/`;
      const alternativeEndpoints = [
        'business/signup/',
        'auth/register/',
        'users/signup/'
      ];

      let response: any;
      let lastError: any;

      try {
        response = await axiosInstance.post(signupEndpoint, payload, { timeout: 20000 });
      } catch (primaryError: any) {
        if (primaryError.response?.status === 404) {
          console.warn(`Endpoint "${signupEndpoint}" not found. Trying alternatives...`);

          for (const altEndpoint of alternativeEndpoints) {
            try {
              response = await axiosInstance.post(altEndpoint, payload, { timeout: 20000 });
              signupEndpoint = altEndpoint;
              break;
            } catch (altError: any) {
              lastError = altError;
              if (altError.response?.status !== 404) {
                throw altError;
              }
            }
          }

          if (!response) {
            throw lastError || new Error('No signup endpoint found');
          }
        } else {
          throw primaryError;
        }
      }

      console.log('Account created successfully:', response.data);

      setTimeout(() => {
        setShowMsg(true);
        setTimeout(() => {
          navigate('/Login', { state: { message: 'Login to see your dashboard' } });
        }, 3000);
        setTimeout(() => { setShowMsg(false); }, 2000);
      }, 2000);

    } catch (err: any) {
      console.error('Failed to create account:', err);

      let errorMsg = 'Something went wrong while creating your account. Please try again or contact support if the issue continues.';

      if (err.response) {
        const data = err.response.data;

        if (data?.email) {
          errorMsg = 'This email address is already registered. Please use a different email or try logging in.';
        } else if (data?.phone_number) {
          errorMsg = 'This phone number is already in use. Please check and try a different number.';
        } else if (data?.business_name || (data?.detail && data.detail.includes('business_name')) || (data?.message && data.message.includes('business_name'))) {
          errorMsg = 'This business name is already taken. Please choose a unique name for your business.';
        } else if (data?.detail) {
          if (data.detail.includes('duplicate key') && data.detail.includes('business_name')) {
            errorMsg = 'This business name is already taken. Please choose a unique name for your business.';
          } else if (data.detail.includes('QueryDict') || data.detail.includes('immutable')) {
            errorMsg = 'Account creation is temporarily unavailable due to a technical issue. Please try again in a few minutes or contact support.';
          } else {
            errorMsg = data.detail;
          }
        } else if (data?.message) {
          if (data.message.includes('duplicate key') && data.message.includes('business_name')) {
            errorMsg = 'This business name is already taken. Please choose a unique name for your business.';
          } else if (data.message.includes('QueryDict') || data.message.includes('immutable')) {
            errorMsg = 'Account creation is temporarily unavailable due to a technical issue. Please try again in a few minutes or contact support.';
          } else {
            errorMsg = data.message;
          }
        } else if (typeof data === 'string') {
          if (data.includes('duplicate key') && data.includes('business_name')) {
            errorMsg = 'This business name is already taken. Please choose a unique name for your business.';
          } else if (data.includes('QueryDict') || data.includes('immutable')) {
            errorMsg = 'Account creation is temporarily unavailable due to a technical issue. Please try again in a few minutes or contact support.';
          } else {
            errorMsg = data;
          }
        } else if (err.response.status === 404) {
          errorMsg = 'Account creation service is temporarily unavailable. Please try again later or reach out to our support team.';
        } else if (err.response.status >= 500) {
          errorMsg = 'A server error occurred. Please try again later or contact support for assistance.';
        }
      }

      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-lg p-4 sm:p-8 bg-white min-h-screen transition-colors duration-200">
        <div className="flex items-center space-x-2 pb-2 mb-6">
          <div onClick={() => navigate(-1)} className="-mb-2 cursor-pointer">
            <img src={ArrowBack} alt="Move back arrow" className="dark:invert" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white">
            Create Account
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mb-10 gap-2">
          <p className="font-medium text-sm sm:text-lg text-gray-800 dark:text-gray-200">
            Profile Information
          </p>
          <p className="text-[#82826A] dark:text-gray-400 font-medium text-sm">Step 3 of 3</p>
        </div>

        <p className="text-left text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Please upload a picture of your business logo or product to complete account setup (optional).
        </p>

        <div className="my-8 sm:my-20">
          {/* Profile Upload Section */}
          <div className="relative w-24 sm:w-32 h-24 sm:h-32 mx-auto mt-6">
            <img
              src={Group}
              alt="Group Icon"
              className="w-full h-full object-cover rounded-full dark:opacity-60"
            />

            {preview && (
              <img
                src={preview}
                alt="Profile Preview"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
              />
            )}

            <label
              htmlFor="fileInput"
              className="absolute -top-2 -right-2 bg-white dark:bg-[#1e2738] border border-transparent dark:border-gray-600 p-1 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform duration-150"
              style={{ width: '30px', height: '30px' }}
            >
              <img
                src={edit}
                alt="Edit Icon"
                className="w-full h-full object-contain dark:invert"
              />
            </label>
          </div>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isSubmitting}
            className="hidden"
          />
        </div>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-xs sm:text-sm mt-2 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className={`w-full bg-primary dark:bg-orange-500 dark:hover:bg-orange-400 text-white p-2 rounded-md mt-6 text-sm sm:text-base font-medium
            transition-all duration-200 dark:shadow-[0_0_12px_rgba(249,115,22,0.3)]
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
          disabled={isSubmitting || showMsg}
        >
          {isSubmitting ? 'Submitting...' : 'Complete Sign Up'}
        </button>

        <div className="w-full">
          <MessageBox
            message="Account created successfully ✅"
            showMessage={showMsg}
            state="success"
            size="20px"
            marginX="1rem"
          />
        </div>
      </div>
    </>
  );
};

export default SetProfileImagePage;