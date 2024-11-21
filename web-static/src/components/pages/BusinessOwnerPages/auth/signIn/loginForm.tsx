// // src/components/auth/LoginForm.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../../../../../api/auth'; // Import mock API

// const LoginForm: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(''); // Clear any previous error

//     try {
//       const { token } = await loginUser(email, password); // Call mock login
//       localStorage.setItem('token', token); // Store the mock token
//       navigate('/dashboard'); // Redirect to dashboard
//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Log In</button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };

// export default LoginForm;
// src/components/auth/LoginForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
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
      const { token } = await loginUser(data.email, data.password); // Call mock login
      localStorage.setItem('token', token); // Store the mock token
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white rounded shadow-md w-96">
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

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={`mt-1 block w-full p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          placeholder="••••••••"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Login hyyyyy
      </button>
    </form>
  );
};

export default LoginForm;
