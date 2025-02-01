// src/api/users.ts
export const getUserProfile = async (id: string) => {
  const token = localStorage.getItem('access'); // Retrieve the access token from localStorage

  if (!token) {
    throw new Error('Unauthorized: No access token found');
  }

  try {
    const response = await fetch(
      `https://trackerr.live/api/v1/business-owners/${id}/`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token in the Authorization header
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch user profile');
    }

    const data = await response.json();
    return data; // Return the user profile data
  } catch (err) {
    console.error('Error fetching user profile:', err);
    throw err; // Propagate the error for further handling
  }
};
