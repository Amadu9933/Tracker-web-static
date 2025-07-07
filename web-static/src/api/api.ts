const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST; // Use environment variable for base URL

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${TRACKERR_HOST}/auth/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Authentication failed');
    }

    const data = await response.json();

    // 🔹 Store access & refresh tokens
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);

    // 🔹 Fetch user details separately to get `id`
    const userResponse = await fetch(`${TRACKERR_HOST}/business-owners/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${data.access}`,
        'Content-Type': 'application/json',
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to retrieve user info');
    }

    const users = await userResponse.json();
    const user = users?.[0]; // 🔹 Get the first user

    if (user) {
      localStorage.setItem('id', user.id.toString()); // ✅ Store the correct user `id`
      localStorage.setItem('email', user.user.email); // ✅ Store email for tracking
    }

    return user;
  } catch (err) {
    console.error('Error logging in:', err);
    throw err;
  }
};
