import React, { useState, useCallback, useEffect } from 'react';
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
  email: yup
    .string()
    .trim()
    .required('Email address is required')
    .email('Please enter a valid email address')
    .max(100, 'Email is too long'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password is too long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
});

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setTrackingHistoryEmail } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    reset,
    trigger,
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const watchedPassword = watch('password');

  useEffect(() => {
    if (watchedPassword && watchedPassword.length > 0) {
      trigger('password');
    }
  }, [watchedPassword, trigger]);

  const onSubmit = async (data: LoginFormData) => {
    if (isLoading || !isValid) return;

    setIsLoading(true);
    setErrorMsg('');
    setShowErrorMsg(false);

    try {
      const response = await loginUser(data.email.trim(), data.password);
      const { access, refresh, account_type } = response;

      if (account_type === 'logistics') {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('userId');
        throw new Error('Only business owners are allowed to log in.');
      }

      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      setTrackingHistoryEmail(data.email.trim());

      reset();
      navigate('/dashboard/');
    } catch (err: any) {
      console.error('Login failed:', err);

      const message =
        err?.message?.toLowerCase().includes('no active account') ||
          err?.message?.toLowerCase().includes('credentials')
          ? 'Invalid email or password ❌'
          : err?.message || 'Something went wrong. Please try again.';

      setErrorMsg(message);
      setShowErrorMsg(true);

      setTimeout(() => setShowErrorMsg(false), 6000);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="text-left bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 w-full pr-0 md:pr-16"
        noValidate
      >
        <h2 className="font-bold mb-7 text-lg sm:text-xl text-slate-900 dark:text-slate-100">Sign in</h2>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6"
        >
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`mt-1 block w-full p-3 pl-4 sm:pl-16 border rounded-md placeholder:text-[#A3A38E] dark:placeholder:text-slate-400 focus:border-primary focus:ring-primary text-sm sm:text-base transition-colors bg-white dark:bg-[#03132D] text-slate-900 dark:text-slate-100
              ${errors.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-black dark:border-gray-600 dark:focus:border-primary'
              }`}
            placeholder="abc@gmail.com"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>
          )}
        </motion.div>

        {/* Password Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative mb-2"
        >
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className={`block w-full p-3 pl-4 sm:pl-16 pr-12 border rounded-md
                placeholder:text-[#A3A38E] dark:placeholder:text-slate-400
                focus:border-primary focus:ring-primary
                text-sm sm:text-base transition-colors
                bg-white dark:bg-[#03132D]
                text-slate-900 dark:text-slate-100
                ${errors.password
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-black dark:border-gray-600 dark:focus:border-primary'
                }`}
              placeholder="••••••••"
              disabled={isLoading}
            />

            {/* ✅ Eye toggle button — transparent bg, no black box in dark mode */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2
                flex items-center justify-center
                w-8 h-8 rounded-full
                bg-transparent
                text-slate-500 dark:text-slate-400
                hover:text-slate-800 dark:hover:text-slate-100
                hover:bg-slate-100 dark:hover:bg-slate-700
                focus:outline-none focus:ring-2 focus:ring-primary
                transition-all duration-200
                disabled:opacity-50"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={isLoading}
            >
              {showPassword
                ? <VisibilityOffOutlinedIcon fontSize="small" />
                : <VisibilityOutlinedIcon fontSize="small" />
              }
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password.message}</p>
          )}
        </motion.div>

        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            className="text-[#6B6856] dark:text-[#A8B2CA] text-xs hover:text-primary dark:hover:text-orange-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* ✅ Submit Button — visible loading state in dark mode */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={!isLoading && isValid && isDirty ? { scale: 1.02 } : {}}
          whileTap={!isLoading && isValid && isDirty ? { scale: 0.98 } : {}}
          type="submit"
          disabled={isLoading || !isValid || !isDirty}
          className="w-full py-3 px-4 rounded text-sm sm:text-base font-medium mt-2
                     flex items-center justify-center gap-2
                     transition-all duration-200
                     bg-primary hover:bg-primary-dark
                     text-white dark:shadow-[0_0_12px_rgba(249,115,22,0.3)]
          "
        >
          {isLoading ? (
            <>
              {/* ✅ Spinner visible in both light and dark mode */}
              <svg
                className="animate-spin h-5 w-5 text-white dark:text-slate-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-white dark:text-slate-300">Signing in...</span>
            </>
          ) : (
            'Sign in'
          )}
        </motion.button>

        <p className="text-center text-xs sm:text-sm mt-6 text-gray-600 dark:text-slate-400">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-primary hover:underline font-medium dark:text-orange-400 dark:hover:text-orange-300">
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