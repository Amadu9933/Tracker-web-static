// src/components/pages/businessOwnerPages/dashboard/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../../../../api/users';  // Mock API to get user profile

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();  // Fetch mock user profile
        setUser(profile);
      } catch (err) {
        setError('Failed to load user profile');
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <div>Hello this Hamraaaz</div>
      
    </div>
  );
};

export default Dashboard;
