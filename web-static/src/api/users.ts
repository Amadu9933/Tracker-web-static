export const getUserProfile = async () => {
  const token = localStorage.getItem('access'); // Retrieve the token
  const userId = localStorage.getItem('userId'); // Retrieve stored user ID
  const cacheKey = `userProfile:${userId}`;

  if (!token || !userId) {
    console.error(' No token or user ID found in localStorage');
    throw new Error('Unauthorized: No token or user ID found');
  }

  // Try to get cached data if offline
  const cached = localStorage.getItem(cacheKey);
  if (!navigator.onLine && cached) {
    return JSON.parse(cached);
  }

  try {
    const response = await fetch(
      `https://trackerr.live/api/v1/business-owners/${userId}/`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      // If fetch fails and cached data exists, use cached
      if (cached) return JSON.parse(cached);
      throw new Error(errorData.detail || 'Failed to retrieve user profile');
    }

    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (err) {
    // If fetch fails and cached data exists, use cached
    if (cached) return JSON.parse(cached);
    console.error('Error fetching user profile:', err);
    throw err;
  }
};
