import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useFormContext } from '../../../../../../context/CreateAccountFormContext';
import { IconButton } from '@mui/material'; // Import Material-UI components
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import Material-UI icons

type PersonalInfoFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

const schema = yup.object({
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
  const { updateFormData } = useFormContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    updateFormData(data); // Save name and other details in context
    navigate('/business-info'); // Navigate to the next step
  };

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className='flex justify-between   mb-10'>
        <p className='font-medium text-lg'>Personal Information</p>
        <p className='text-[#82826A]  font-medium'>Step 1 of 3</p>
      </div>
      {/* Name Field */}
      <div className="space-y-2 ">
        <label htmlFor="name" className="block text-sm font-medium text-secondary">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          {...register('name')}
          className="w-full p-2 border border-red-600 rounded-md placeholder:text-[#A3A38E] focus:border-primary focus:ring-primary"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          className="w-full h-12 p-2 border border-[#D9E1E7] rounded-md placeholder:text-[#A3A38E]"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          id="phone"
          type="text"
          placeholder="+233540985004"
          {...register('phone')}
          className="w-full  p-2 pl-0 border border-gray-300 rounded-md "

        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative ">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
            placeholder="Enter your password"
            {...register('password')}
            className="w-full h-12 p-2 pr-10 border border-gray-300 rounded-md placeholder:text-[#A3A38E] focus:border-primary focus:ring-primary"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <IconButton
              onClick={handleTogglePassword}
              edge="end"
              className="p-0" // Remove default padding from IconButton
              style={{ padding: 0, margin: 0 }} // Ensure no extra spacing
            >
              {showPassword ? (
                <VisibilityOff className="h-5 w-5 text-gray-500" /> // Customize icon size and color
              ) : (
                <Visibility className="h-5 w-5 text-gray-500" />
              )}
            </IconButton>
          </div>
        </div>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>
      <p className='text-secondary text-sm pb-8'>Password MUST contain at least one uppercase, one lowercase, one number</p>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary-dark transition-colors"
      >
        Continue
      </button>

      {/* Sign In Link */}
      <div className="text-center mt-8  font-[16px] pb-20" >
        <span className="">
          Already have an account?{' '}
          <Link to="/Login" className="text-primary ">
            Sign in
          </Link>
        </span>
      </div>
    </form>
  );
};

export default PersonalInfoForm;