export const getUserProfile = async () => {
  const token = localStorage.getItem('access'); // Retrieve the token
  const userId = localStorage.getItem('userId'); // Retrieve stored user ID

  if (!token || !userId) {
    console.error('❌ No token or user ID found in localStorage');
    throw new Error('Unauthorized: No token or user ID found');
  }

  try {
    const response = await fetch(
      `https://trackerr.live/api/v1/business-owners/${userId}/`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Ensure correct format
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to retrieve user profile');
    }

    return await response.json();
  } catch (err) {
    console.error('🚨 Error fetching user profile:', err);
    throw err;
  }
};
