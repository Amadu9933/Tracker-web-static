// src/components/auth/PersonalInfoForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const PersonalInfoForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfoFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    console.log('Form Data:', data);
    // Handle form submission (e.g., API call to create a new account)
  };

  return (
    <>
    
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto text-left  p-4 bg-white shadow-md rounded-lg">
      {/* Name Field */}
      <div className="mb-4">
      <div className="flex justify-between  mb-8"><p>Personal information</p> <p>Step 1 of 3</p></div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={`mt-1 p-2 border rounded-md w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`mt-1 p-2 border rounded-md w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Phone Number Field */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className={`mt-1 p-2 border rounded-md w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={`mt-1 p-2 border rounded-md w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-primary text-white p-2 rounded-md w-full hover:bg-white hover:text-primary">
        Continue
      </button>

      <div className=" text-center">
        <p className=" my-5">Already have an account ? <span className="text-primary">Sign in</span></p>
      </div>
    </form>

    </>
  );
};

export default PersonalInfoForm;
