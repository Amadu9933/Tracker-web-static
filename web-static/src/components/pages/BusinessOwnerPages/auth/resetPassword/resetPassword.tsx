import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Validation schema using Yup
const passwordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

// Define form data type
interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'business' | 'logistics'>(
    'business'
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log(`New password set for ${activeTab} tab`);
    alert('Your password has been successfully reset.');
  };

  return (
    <div className="px-[10%] pt-16 bg-gray-300 rounded-lg w-[60%] h-[450px] text-left mx-auto">
      {/* Title Section */}
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
          <label
            htmlFor="newPassword"
            className="block font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            {...register('newPassword')}
            placeholder="Enter new password"
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors.newPassword ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            placeholder="Confirm new password"
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-primary   py-2 rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
