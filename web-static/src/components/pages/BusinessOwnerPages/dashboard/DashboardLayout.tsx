import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark">
      {/* Sidebar & Header (always visible) */}


      {/* Only render the active page */}
      <div className="dashboard-body">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
