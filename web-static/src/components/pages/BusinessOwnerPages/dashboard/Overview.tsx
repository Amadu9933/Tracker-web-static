import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetCurrentDate } from '@components/utils/GetCurrentDate';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Package from './assets/package.png';
import Square from './assets/minus-square.png';
import SandBox from './assets/codesandbox.png';

const Overview = () => {
  const [stats, setStats] = useState({
    delivered_status_count: 0,
    returned_status_count: 0,
    pending_status_count: 0,
    total_tracking_generated: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (!token) {
        console.warn('No token found in localStorage');
        return;
      }

      try {
        const res = await axios.get('https://trackerr.live/api/v1/trackings/status-count', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
            accept: 'application/json',  // Ensure the API returns JSON
          },
        });

        setStats(res.data);
      } catch (error: any) {
        console.error('Error fetching dashboard stats:', error);
        if (error.response?.status === 401) {
          alert('Session expired. Please log in again.');
          // Optional: Redirect to login page or trigger login modal
        }
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between mt-8 pb-4 px-2 ">
        <p>Overview</p>
        <div className="flex text-[#828282]">
          <div className="mr-2">
            <CalendarTodayOutlinedIcon sx={{ width: 15, height: 15 }} />
          </div>
          <p className="text-base pt-0.5">{GetCurrentDate()}</p>
        </div>
      </div>

      <div className="flex full h-36 bg-slate-600 rounded-md text-white">
        {/* Total ID's Generated */}
        <div className="flex-1 text-center flex justify-center px-16 pt-12">
          <div className="text-primary pr-3">
            <div className="bg-primary/25 p-1 rounded-[50%]">
              <img src={SandBox} alt="" />
            </div>
          </div>
          <div className="text-left">
            <p className="text-[18px] font-medium text-[#D1E8FA]">
              Total ID's Generated
            </p>
            <p className="text-2xl">{stats.total_tracking_generated}</p>
          </div>
        </div>

        {/* Orders Completed */}
        <div className="flex-1 text-center flex justify-center border-x border-gray-500 px-16 pt-12">
          <div className="text-primary pr-3">
            <div className="bg-[#B4D479]/25 p-1 rounded-[50%]">
              <img src={Package} alt="Package" />
            </div>
          </div>
          <div className="text-left">
            <p className="text-[18px] font-medium text-[#D1E8FA]">
              Order completed
            </p>
            <p className="text-2xl">
              {stats.delivered_status_count}{' '}
              <span className="text-[18px] font-medium text-[#D1E8FA]">
                items
              </span>
            </p>
          </div>
        </div>

        {/* Orders Returned */}
        <div className="flex-1 text-center flex justify-center px-16 pt-12">
          <div className="text-primary pr-3">
            <div className="bg-primary/25 p-1 rounded-[50%]">
              <img src={Square} alt="Square" />
            </div>
          </div>
          <div className="text-left">
            <p className="text-[18px] font-medium text-[#D1E8FA]">
              Orders Returned
            </p>
            <p className="text-2xl">
              {stats.returned_status_count}{' '}
              <span className="text-[18px] font-medium text-[#D1E8FA]">
                items
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
