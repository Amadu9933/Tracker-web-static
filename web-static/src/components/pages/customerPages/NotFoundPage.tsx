import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        Go back to <Link to="/">homepage</Link>.
      </p>
    </div>
  );
};

export default NotFoundPage;
