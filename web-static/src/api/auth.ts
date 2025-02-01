// src/api/auth.ts
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('https://trackerr.live/api/v1/auth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Send email and password in the request body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Authentication failed');
    }

    const data = await response.json();

    // Store access and refresh tokens in localStorage
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);

    return data; // Return user info (id, account_type, etc.)
  } catch (err) {
    console.error('Error logging in:', err);
    throw err; // Propagate error for further handling
  }
};
