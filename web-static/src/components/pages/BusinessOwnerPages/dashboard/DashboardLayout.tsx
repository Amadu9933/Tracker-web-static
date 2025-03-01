import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div>
      {/* Sidebar & Header (always visible) */}


      {/* Only render the active page */}
      <div className="dashboard-body">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
