import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../../../../../context/CreateAccountFormContext';
import axiosInstance from '../../../../../../api/axiosInstance'; //axios instant

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const SetProfileImagePage: React.FC = () => {
  const { formData } = useFormContext();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clean up the preview URL when the component unmounts or the image changes
  useEffect(() => {
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setPreview(previewUrl);
      return () => {
        URL.revokeObjectURL(previewUrl);
      };
    } else {
      setPreview(null);
    }
  }, [image]);

  // File validation helpers
  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File too large. Please select a file smaller than 2MB.';
    }
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
      setError(null); // Clear previous errors
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setError('Please upload a profile image.');
      return;
    }

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
      payload.append('avatar', image);

      // Debugging: Log FormData contents
      for (const [key, value] of payload.entries()) {
        console.log(`${key}:`, value instanceof File ? value.name : value);
      }

      const response = await axiosInstance.post('', payload);

      console.log('Account created successfully:', response.data);
      navigate('/Sign-in', {
        state: { message: 'Login to see your dashboard' },
      });
    } catch (err: any) {
      console.error('Failed to create account:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Set Profile Image</h1>
      <label
        htmlFor="fileInput"
        className="block text-sm font-medium text-gray-700"
      >
        Upload Profile Image
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isSubmitting}
        className="mt-2"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="my-4 w-32 h-32 object-cover rounded-full"
        />
      )}
      <button
        onClick={handleSubmit}
        className={`w-full bg-primary text-white p-2 rounded-md ${!image || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!image || isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Complete Sign Up'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default SetProfileImagePage;
