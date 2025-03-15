import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../../../../../context/CreateAccountFormContext';
import axiosInstance from '../../../../../../api/axiosInstance'; // Axios instance

import { Group, edit, ArrowBack } from '../../assets/Assets';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const SetProfileImagePage: React.FC = () => {
  const { formData } = useFormContext();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (!file.type.startsWith('image/')) return 'Please select a valid image file.';
    if (file.size > MAX_FILE_SIZE) return 'File too large. Select a file smaller than 2MB.';
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
      payload.append('account_type', 'business');

      // Append image only if one is selected
      if (image) {
        payload.append('avatar', image);
      }

      const response = await axiosInstance.post('', payload);

      console.log('Account created successfully:', response.data);
      navigate('/Login', { state: { message: 'Login to see your dashboard' } });
    } catch (err: any) {
      console.error('Failed to create account:', err);
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg p-8">
      <div className="flex items-center space-x-2 pb-2 mb-6">
        <div onClick={() => navigate(-1)} className="-mb-2 ">
          <img src={ArrowBack} alt="Move back arrow" />
        </div>
        <h1 className="text-5xl font-semibold">Create Account</h1>
      </div>
      <div className="flex justify-between mb-10">
        <p className="font-medium text-lg">Profile Information</p>
        <p className="text-[#82826A] font-medium">Step 3 of 3</p>
      </div>

      <p className="text-left text-gray-600">
        Please upload a picture of your business logo or product to complete account setup (optional).
      </p>
      <div className="my-20">
        {/* Profile Upload Section */}
        <div className="flex w-32 h-32 mx-auto mt-6">
          <img src={Group} alt="" />
          <label htmlFor="fileInput" className="cursor-pointer relative">
            {/* Show uploaded image or default group icon */}
            {preview ? (
              <img src={preview} alt="Profile" className="w-32 h-32 object-cover rounded-full border border-gray-300" />
            ) : (
              <div className="w-10 h-10">
                <img src={edit} alt="Edit Icon" className="" />
              </div>
            )}
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
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`w-full bg-primary text-white p-2 rounded-md mt-6 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Complete Sign Up'}
      </button>
    </div>
  );
};

export default SetProfileImagePage;
