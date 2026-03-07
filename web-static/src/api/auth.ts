const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;

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
//  Logout function (removes tokens and redirects to login)
export const logoutUser = async () => {
  try {
    const refresh_token = localStorage.getItem('refresh')
    const response = await fetch(`${TRACKERR_HOST}/auth/token/blacklist/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh : refresh_token }),
    });

  if (response.status === 200) console.log('Logged Out') 
    // remove all storage data
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  localStorage.removeItem('userId');

  // Redirect to login page
  window.location.href = '/login';
  } catch(err) {
    console.error('An error occurred while logging out')
  }
};
