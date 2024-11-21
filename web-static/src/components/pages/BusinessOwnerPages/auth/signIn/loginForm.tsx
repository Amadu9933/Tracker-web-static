import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { loginUser } from '../../../../../api/auth'; // Mock API

// Define form data type
interface LoginFormData {
  email: string;
  password: string;
}

// Validation schema using yup
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
      const { token } = await loginUser(data.email, data.password); // Mock API call
      localStorage.setItem('token', token); // Store the token
      navigate('/dashboard'); // Redirect
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 text-left bg-white  w-96">
      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`mt-1 block w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          placeholder="example@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div className="relative mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          className={`mt-1 block w-full p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          placeholder="******"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-3 top-8 flex items-center text-gray-500 focus:outline-none"
        >
          {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
        </button>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

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
  );
};

export default LoginForm;
