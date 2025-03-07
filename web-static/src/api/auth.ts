export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('https://trackerr.live/api/v1/auth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Authentication failed');
    }

    const data = await response.json();

    // ✅ Store tokens
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    localStorage.setItem('userId', data.id); // ✅ Store user ID

    return data;
  } catch (err) {
    console.error('🚨 Error logging in:', err);
    throw err;
  }
};
