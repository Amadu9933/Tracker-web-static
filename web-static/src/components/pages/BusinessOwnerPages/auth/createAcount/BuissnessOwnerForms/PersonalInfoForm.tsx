import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom'; // Import Link and useNavigate

type PersonalInfoFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

// Yup validation schema
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const PersonalInfoForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    console.log('Form Data:', data);
    navigate('/business-info'); // Navigate to the BusinessInfo component
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mr-20 mx-auto text-left text-secondary bg-white"
      >
        {/* Name Field */}
        <div className="mb-4">
          <div className="flex justify-between mb-8">
            <p className="text-lg">Personal information</p>
            <p className="text-sm text-[#82826A]">Step 1 of 3</p>
          </div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`mt-1 p-2 placeholder-[#A3A38E] placeholder-left border rounded-md w-full ${errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Amau Hamza"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`mt-1 p-2 border placeholder-[#A3A38E] rounded-md w-full ${errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="hamza@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className={`mt-1 p-2 placeholder-[#A3A38E] border rounded-md w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="+233540985004"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Password Field with Toggle */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={`mt-1 p-2 border placeholder-[#A3A38E] rounded-md w-full ${errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 mt-3 flex items-center justify-center h-full pr-3 text-gray-500"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary mt-8 text-white p-2 rounded-md w-full hover:bg-white hover:text-primary"
        >
          Continue
        </button>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="my-5">
            Already have an account?{' '}
            <Link to="/Sign-in" className="text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default PersonalInfoForm;
