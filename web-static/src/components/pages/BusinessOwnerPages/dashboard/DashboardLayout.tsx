import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background-light text-text-primary-light">
      {/* Sidebar & Header (always visible) */}


      {/* Only render the active page */}
      <div className="dashboard-body">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
