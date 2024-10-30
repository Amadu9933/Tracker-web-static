// src/pages/BusinessOwnerPages/user/Profile.tsx
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();

  return (
    <div>
      <h1>User Profile: {userId}</h1>
    </div>
  );
};

export default Profile;
