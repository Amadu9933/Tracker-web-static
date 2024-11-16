// src/components/BuissnessOwnerForms/PersonalInfoForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

type PersonalInfoFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

// Yup validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required').matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const PersonalInfoForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    console.log('Form Data:', data);
    navigate('/business-info');
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col  justify-center h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div className="flex justify-between mb-8">
          <p className="text-lg text-secondary">Personal information</p>
          <p className="text-sm text-[#82826A]">Step 1 of 3</p>
        </div>
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`mt-1 p-2 border placeholder-[#A3A38E] rounded-md w-full ${errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`mt-1 p-2 border placeholder-[#A3A38E] rounded-md w-full ${errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="example@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone Number Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className={`mt-1 p-2 border placeholder-[#A3A38E] rounded-md w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="1234567890"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        {/* Password Field */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={`mt-1 p-2 border rounded-md w-full ${errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="******"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 mt-7 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
          </button>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-primary text-white p-2 rounded-md ">
          Continue
        </button>

        {/* Sign In Link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
