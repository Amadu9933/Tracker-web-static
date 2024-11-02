// src/api/users.ts
export const getUserProfile = async () => {
    return new Promise<{ name: string; email: string }>((resolve, reject) => {
      const token = localStorage.getItem('token');
      if (token === 'mocked-jwt-token') {
        // Simulate fetching a user profile with mock data
        resolve({ name: 'Hamza', email: 'test@example.com' });
      } else {
        // Simulate an error if the token is invalid or missing
        reject(new Error('Unauthorized'));
      }
    });
  };
  