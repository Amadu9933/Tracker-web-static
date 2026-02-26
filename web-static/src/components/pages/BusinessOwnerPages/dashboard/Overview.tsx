import { useEffect, useState } from 'react';
import { fetchStatusCount } from '../../../../api/tracking';
import { getCurrentDate } from '../../../../utils/statusUtils';
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
  const [statsError, setStatsError] = useState<string | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
        console.warn('No token found in localStorage');
        setStatsLoading(false);
        return;
      }
      try {
        setStatsLoading(true);
        setStatsError(null);
        const data = await fetchStatusCount();
        setStats(data);
      } catch (error: any) {
        console.error('Error fetching dashboard stats:', error);
        if (error.response?.status === 401) {
          setStatsError('Session expired. Please log in again.');
        } else {
          setStatsError('Failed to load statistics. Please try again.');
        }
      } finally {
        setStatsLoading(false);
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
          <p className="text-base pt-0.5">{getCurrentDate()}</p>
        </div>
      </div>

      {statsError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {statsError}
        </div>
      )}

      {statsLoading && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          Loading statistics...
        </div>
      )}

      <div className="flex flex-col md:flex-row h-auto md:h-36 bg-slate-600 rounded-md text-white">
        {/* Total ID's Generated */}
        <div className="flex-1 text-center flex justify-center px-4 sm:px-8 md:px-16 pt-8 md:pt-12">
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
        <div className="flex-1 text-center flex justify-center border-x border-gray-500 px-4 sm:px-8 md:px-16 pt-8 md:pt-12">
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
        <div className="flex-1 text-center flex justify-center px-4 sm:px-8 md:px-16 pt-8 md:pt-12">
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
