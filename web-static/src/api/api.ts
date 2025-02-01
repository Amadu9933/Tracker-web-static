// src/api/auth.ts
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(
      'https://your-backend-url.com/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password in the request body
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    return data; // Ensure the API returns a `token` in the response
  } catch (err) {
    console.error('Error logging in:', err);
    throw err;
  }
};
