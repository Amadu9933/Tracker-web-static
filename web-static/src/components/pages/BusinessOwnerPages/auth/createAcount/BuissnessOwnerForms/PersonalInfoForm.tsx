import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useFormContext } from '../../../../../../context/CreateAccountFormContext';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';

type PersonalInfoFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required').matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const PersonalInfoForm: React.FC = () => {
  const { updateFormData } = useFormContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfoFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    updateFormData(data);
    navigate('/business-info');
  };

  const fields = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter your name',
      borderColor: 'border-red-600',
      delay: 0.2,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      borderColor: 'border-black',
      delay: 0.3,
    },
    {
      id: 'phone',
      label: 'Phone',
      type: 'text',
      placeholder: '+233540985004',
      borderColor: 'border-gray-300',
      delay: 0.4,
    },
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full  "
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between mb-8 sm:mb-10 gap-1 sm:gap-2"
      >
        <p className="font-medium text-base sm:text-lg">Personal Information</p>
        <p className="text-[#82826A] font-medium text-xs sm:text-sm">Step 1 of 3</p>
      </motion.div>

      {/* Name, Email, Phone fields */}
      {fields.map(({ id, label, type, placeholder, borderColor, delay }) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.5 }}
          className="space-y-1"
        >
          <label htmlFor={id} className="block text-xs sm:text-sm font-medium text-gray-700">
            {label}
          </label>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            {...register(id as keyof PersonalInfoFormData)}
            className={`w-full p-2 sm:p-3 text-sm border ${borderColor} rounded-md placeholder:text-[#A3A38E] focus:border-primary focus:ring-primary`}
          />
          {errors[id as keyof PersonalInfoFormData] && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors[id as keyof PersonalInfoFormData]?.message}
            </p>
          )}
        </motion.div>
      ))}

      {/* Password field */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="space-y-1"
      >
        <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            {...register('password')}
            className="w-full p-2 sm:p-3 text-sm pr-10 border border-black rounded-md placeholder:text-[#A3A38E] focus:border-primary focus:ring-primary"
          />
          <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center">
            <IconButton
              onClick={() => setShowPassword(prev => !prev)}
              edge="end"
              style={{ padding: 0, margin: 0 }}
            >
              {showPassword
                ? <VisibilityOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                : <Visibility className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              }
            </IconButton>
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password.message}</p>
        )}
      </motion.div>

      {/* Password hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-secondary text-xs sm:text-sm pb-4 sm:pb-8"
      >
        Password MUST contain at least one uppercase, one lowercase, one number
      </motion.p>

      {/* Submit */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-primary text-white py-2.5 px-4 rounded-md text-sm sm:text-base hover:bg-primary-dark transition-colors"
      >
        Continue
      </motion.button>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-6 pb-16 sm:pb-20 text-sm sm:text-base"
      >
        Already have an account?{' '}
        <Link to="/Login" className="text-primary hover:underline">
          Sign in
        </Link>
      </motion.div>
    </motion.form>
  );
};

export default PersonalInfoForm;