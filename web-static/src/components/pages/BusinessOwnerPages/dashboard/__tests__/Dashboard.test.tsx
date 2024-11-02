// src/components/pages/businessOwnerPages/dashboard/__tests__/Dashboard.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Dashboard } from '../Dashboard';
import * as userApi from '@api/users';  // Mock the user API

// Mock the getUserProfile API function
jest.spyOn(userApi, 'getUserProfile').mockImplementation(async () => ({
  name: 'John Doe',
  email: 'test@example.com',
}));

describe('Dashboard Component', () => {
  test('renders loading state initially', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('displays user profile after successful fetch', async () => {
    render(<Dashboard />);

    // Wait for the user data to load
    await waitFor(() => {
      expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Email: test@example.com/i)).toBeInTheDocument();
    });
  });

  test('displays an error message if profile fetch fails', async () => {
    // Mock the API to throw an error
    jest.spyOn(userApi, 'getUserProfile').mockImplementationOnce(async () => {
      throw new Error('API Error');
    });

    render(<Dashboard />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Failed to load user profile/i)).toBeInTheDocument();
    });
  });
});
