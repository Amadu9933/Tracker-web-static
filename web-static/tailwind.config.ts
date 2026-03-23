/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF833C',
        secondary: '#354755',
        neutral: '#C6C5B9',
        background: {
          light: '#FFFFFF',
          dark: '#121212',
        },
        surface: {
          light: '#F5F5F5',
          dark: '#1E1E1E',
        },
        'text-primary': {
          light: '#000000',
          dark: '#FFFFFF',
        },
        'text-secondary': {
          light: '#666666',
          dark: '#B0B0B0',
        },
        border: {
          light: '#E0E0E0',
          dark: '#333333',
        },
        accent: {
          light: '#FF833C',
          dark: '#FF833C',
        },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        lora: ['Lora', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
