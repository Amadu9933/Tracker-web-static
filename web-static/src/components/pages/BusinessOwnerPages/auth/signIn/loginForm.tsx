import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../../context/AuthContext';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { loginUser } from '../../../../../api/auth';
import MessageBox from '@components/common/reusable/messageBox';
import { motion } from 'framer-motion';

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const { setTrackingHistoryEmail } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data.email, data.password);
      const { access, refresh, account_type } = response;
      if (account_type === 'logistics') {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('userId');
        throw new Error('Only business owners allowed!');
      }
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      setTrackingHistoryEmail(data.email);
      navigate('/dashboard/');
    } catch (err: any) {
      console.error('Login failed:', err);
      setErrorMsg(
        err?.message?.toLowerCase() === 'no active account found with the given credentials'
          ? 'Invalid email or password ❌'
          : err?.message
      );
      setTimeout(() => {
        setShowErrorMsg(true);
        setTimeout(() => setShowErrorMsg(false), 6000);
      }, 3000);
    }
  };

  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="text-left bg-white w-full pr-0 md:pr-16 "
      >
        <h2 className="font-bold mb-7 text-lg sm:text-xl">Sign in</h2>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6"
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`mt-1 block w-full p-3 pl-4 sm:pl-16 border border-black rounded-md placeholder:text-[#A3A38E] focus:border-primary focus:ring-primary text-sm sm:text-base ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="abc@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>
          )}
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={`mt-1 block w-full p-3 pl-4 sm:pl-16 pr-10 border border-black rounded-md placeholder:text-[#A3A38E] focus:border-primary focus:ring-primary text-sm sm:text-base ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="******"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 top-8 flex items-center text-gray-500 focus:outline-none"
          >
            {showPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password.message}</p>
          )}
        </motion.div>

        <div className="text-right text-[#6B6856] text-xs my-2">
          <Link to="/forgot-password">Forgot password</Link>
        </div>

        <p className="text-xs mb-6 text-gray-500">
          Password MUST contain at least one uppercase, one lowercase, one number
        </p>

        {/* Submit */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-primary text-white py-2.5 px-4 rounded text-sm sm:text-base hover:bg-primary-dark transition"
        >
          Sign in
        </motion.button>

        <p className="text-center text-xs sm:text-sm mt-4">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </motion.form>

      <MessageBox
        message={errorMsg}
        showMessage={showErrorMsg}
        state="warning"
        size="12px"
        marginX="2rem"
      />
    </>
  );
};

export default LoginForm;