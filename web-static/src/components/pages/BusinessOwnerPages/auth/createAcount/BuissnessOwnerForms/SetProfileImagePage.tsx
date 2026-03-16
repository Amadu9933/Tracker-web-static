import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../../../../../context/CreateAccountFormContext';
import axiosInstance from '../../../../../../api/axiosInstance'; // Axios instance

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

  // Generate preview URL
  useEffect(() => {
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setPreview(null);
    }
  }, [image]);

  // Validate selected file
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
      setPreview(URL.createObjectURL(file)); // ✅ Set preview immediately
      setError(null);
    }
  };


  // Handle form submission
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

      // Append image only if one is selected
      if (image) {
        payload.append('avatar', image);
      }

      // Try the correct signup endpoint
      let signupEndpoint = `${TRACKERR_HOST}/business-owners/signup/`;

      // Alternative endpoints to try if the primary fails
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
        // If primary endpoint returns 404, try alternatives
        if (primaryError.response?.status === 404) {
          console.warn(`Endpoint "${signupEndpoint}" not found. Trying alternatives...`);

          for (const altEndpoint of alternativeEndpoints) {
            try {
              console.log(`Trying endpoint: ${altEndpoint}`);
              response = await axiosInstance.post(altEndpoint, payload, { timeout: 20000 });
              signupEndpoint = altEndpoint; // Success with this endpoint
              break;
            } catch (altError: any) {
              lastError = altError;
              if (altError.response?.status !== 404) {
                throw altError; // If it's not 404, it's a real error
              }
              // If it's 404, continue to next endpoint
            }
          }

          // If we tried all alternatives and they all failed
          if (!response) {
            throw lastError || new Error('No signup endpoint found');
          }
        } else {
          throw primaryError;
        }
      }

      console.log('Account created successfully:', response.data);
      console.log(`Used endpoint: ${signupEndpoint}`);

      setTimeout(() => {
        setShowMsg(true)
        setTimeout(() => {
          navigate('/Login', { state: { message: 'Login to see your dashboard' } });
        }, 3000)
        setTimeout(() => { setShowMsg(false) }, 2000)
      }, 2000)
    } catch (err: any) {
      console.error('Failed to create account:', err);

      // Extract error message from various possible response formats
      let errorMsg = 'Something went wrong while creating your account. Please try again or contact support if the issue continues.';

      if (err.response) {
        const data = err.response.data;

        // Check for specific field errors
        if (data?.email) {
          errorMsg = 'This email address is already registered. Please use a different email or try logging in.';
        } else if (data?.phone_number) {
          errorMsg = 'This phone number is already in use. Please check and try a different number.';
        } else if (data?.business_name || (data?.detail && data.detail.includes('business_name')) || (data?.message && data.message.includes('business_name'))) {
          errorMsg = 'This business name is already taken. Please choose a unique name for your business.';
        } else if (data?.detail) {
          // Check for database constraint errors
          if (data.detail.includes('duplicate key') && data.detail.includes('business_name')) {
            errorMsg = 'This business name is already taken. Please choose a unique name for your business.';
          } else if (data.detail.includes('QueryDict') || data.detail.includes('immutable')) {
            errorMsg = 'Account creation is temporarily unavailable due to a technical issue. Please try again in a few minutes or contact support.';
          } else {
            errorMsg = data.detail;
          }
        } else if (data?.message) {
          // Check for database constraint errors in message
          if (data.message.includes('duplicate key') && data.message.includes('business_name')) {
            errorMsg = 'This business name is already taken. Please choose a unique name for your business.';
          } else if (data.message.includes('QueryDict') || data.message.includes('immutable')) {
            errorMsg = 'Account creation is temporarily unavailable due to a technical issue. Please try again in a few minutes or contact support.';
          } else {
            errorMsg = data.message;
          }
        } else if (typeof data === 'string') {
          // Check for database constraint errors in string data
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
      } // end err.response check

      // assign the computed error message to state
      setError(errorMsg);
    } finally {
      // ensure submitting flag is reset even if an error occurs
      setIsSubmitting(false);
    }
  }; // close handleSubmit

  // render JSX for the page
  return (
    <>
      <div className="mx-auto max-w-lg p-4 sm:p-8">
        <div className="flex items-center space-x-2 pb-2 mb-6">
          <div onClick={() => navigate(-1)} className="-mb-2">
            <img src={ArrowBack} alt="Move back arrow" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold">Create Account</h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mb-10 gap-2">
          <p className="font-medium text-sm sm:text-lg">Profile Information</p>
          <p className="text-[#82826A] font-medium text-sm">Step 3 of 3</p>
        </div>

        <p className="text-left text-gray-600 text-sm sm:text-base">
          Please upload a picture of your business logo or product to complete account setup (optional).
        </p>
        <div className="my-8 sm:my-20">
          {/* Profile Upload Section */}
          <div className="relative w-24 sm:w-32 h-24 sm:h-32 mx-auto mt-6">
            {/* Group icon as background */}
            <img src={Group} alt="Group Icon" className="w-full h-full object-cover rounded-full" />

            {/* Previewed image on top if available */}
            {preview && (
              <img
                src={preview}
                alt="Profile Preview"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
              />
            )}

            {/* Edit icon in the top-right corner */}
            <label
              htmlFor="fileInput"
              className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow cursor-pointer"
              style={{ width: '30px', height: '30px' }}
            >
              <img src={edit} alt="Edit Icon" className="w-full h-full object-contain" />
            </label>
          </div>

          {/* Hidden File Input */}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isSubmitting}
            className="hidden"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-xs sm:text-sm mt-2 text-center">{error}</p>}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className={`w-full bg-primary text-white p-2 rounded-md mt-6 text-sm sm:text-base ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={isSubmitting || showMsg}
        >
          {isSubmitting ? 'Submitting...' : 'Complete Sign Up'}

        </button>
        <div className='w-full'><MessageBox
          message="Account created successfully ✅"
          showMessage={showMsg}
          state="success"
          size="20px"
          marginX="1rem"
        /></div>

      </div>

    </>
  );
};

export default SetProfileImagePage;
