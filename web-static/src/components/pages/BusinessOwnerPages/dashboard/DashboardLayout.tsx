// src/components/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div>
      <div className="dashboard-body">
        <Outlet /> {/* Nested routes will render here */}
      </div>
    </div>
  );
};

export default DashboardLayout;
