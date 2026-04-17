import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useFormContext } from '../../../../../../context/CreateAccountFormContext';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import TextInput from '../../sharedFormComponents/TextInput';// adjust path as needed

type PersonalInfoFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
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
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    updateFormData(data);
    navigate('/business-info');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between mb-8 sm:mb-10 gap-1 sm:gap-2"
      >
        <p className="font-medium text-base sm:text-lg text-gray-900 dark:text-gray-100">
          Personal Information
        </p>
        <p className="text-[#82826A] dark:text-gray-400 font-medium text-xs sm:text-sm">
          Step 1 of 3
        </p>
      </motion.div>

      {/* Name field */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className=''
      >
        <TextInput
          id="name"
          label="Name"
          register={register}
          error={errors.name}
        />
      </motion.div>

      {/* Email field */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <TextInput
          id="email"
          label="Email"
          type="email"
          register={register}
          error={errors.email}
        />
      </motion.div>

      {/* Phone field */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <TextInput
          id="phone"
          label="Phone"
          register={register}
          error={errors.phone}


        />
      </motion.div>

      {/* Password field */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <TextInput
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          register={register}
          error={errors.password}
          rightIcon={
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
              size="small"
              tabIndex={-1}
              style={{ padding: 4 }}
            >
              {showPassword ? (
                <VisibilityOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <Visibility className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
              )}
            </IconButton>
          }
        />
      </motion.div>

      {/* Password hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-secondary dark:text-gray-400 text-xs sm:text-sm pb-4 sm:pb-8"
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
        className="w-full bg-primary dark:bg-orange-500 dark:hover:bg-orange-400
          dark:shadow-[0_0_12px_rgba(249,115,22,0.3)] text-white py-2.5 px-4
          rounded-md text-sm sm:text-base font-medium transition-all duration-200"
      >
        Continue
      </motion.button>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-6 pb-16 sm:pb-20 text-sm sm:text-base text-gray-700 dark:text-gray-300"
      >
        Already have an account?{' '}
        <Link to="/Login" className="text-primary dark:text-orange-400 hover:underline">
          Sign in
        </Link>
      </motion.div>
    </motion.form>
  );
};

export default PersonalInfoForm;