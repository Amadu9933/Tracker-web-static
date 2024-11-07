// src/api/auth.ts
export const loginUser = async (email: string, password: string) => {
  return new Promise<{ token: string }>((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password123') {
        // Simulate a successful login with a mock token
        resolve({ token: 'mocked-jwt-token' });
      } else {
        // Simulate failed login
        reject(new Error('Invalid login credentials'));
      }
    }, 1000); // Simulate network delay
  });
};

export const logoutUser = async () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500); // Simulate network delay
  });
};
