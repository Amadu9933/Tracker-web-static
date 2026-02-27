import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../../context/AuthContext';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { loginUser } from '../../../../../api/auth';
import MessageBox from '@components/common/reusable/messageBox';

// Define form data type
interface LoginFormData {
  email: string;
  password: string;
}

// Validation schema using yup
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
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false)

  const { setTrackingHistoryEmail } = useAuth();


  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data.email, data.password); // Call real API
      const { access } = response; // Extract the access token from response
      console.log(response)
      // Store token in localStorage
      localStorage.setItem('access', access);
      setTrackingHistoryEmail(data.email)
      // Redirect user to the dashboard or another protected route
      navigate('/dashboard/');
    } catch (err: any) {
      console.error('Login failed:', err);
      if (err?.message.toLowerCase() === 'no active account found with the given credentials') {
        setErrorMsg('Invalid email or password ❌');
      } else {
        setErrorMsg(err?.message)
      }
      setTimeout(() => {
        setShowErrorMsg(true)
        setTimeout(() => {
          setShowErrorMsg(false)
        }, 6000)
      }, 3000)
      // alert(
      //   err instanceof Error
      //     ? err.message
      //     : 'Login failed. Please check your credentials.'
      // );
    }
  };


  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-left bg-white pr-0 md:pr-16"
      >

        <h2 className="text-lg font-bold mb-7 text-lg sm:text-xl">Sign in</h2>

        {/* Email Field */}
        <div className="mb-6 ">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`mt-1 block w-full p-3 pl-16 border border-black rounded-md placeholder:text-[#A3A38E] focus:border-primary focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="abc@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative ">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={`mt-1 block w-full p-3  pl-16 pr-10 border border-black rounded-md placeholder:text-[#A3A38E] focus:border-primary focus:ring-primary ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="******"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 top-8 flex items-center text-gray-500 focus:outline-none"
          >
            {showPassword ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <div className='text-right text-[#6B6856] text-[12px] my-2' >
          <Link to="/forgot-password">
            Forgot password
          </Link>
        </div>
        <p className='text-xs mb-6'>Password MUST contain at least one uppercase, one lowercase, one number</p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
        >
          Sign in
        </button>

        {/* Footer */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </form>
      <MessageBox
        message={errorMsg}
        showMessage={showErrorMsg}
        state='warning'
        size={'12px'}
        marginX='2rem'
      />
    </>
  );
};

export default LoginForm;
