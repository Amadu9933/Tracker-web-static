import { useEffect, useState } from 'react';
import { fetchStatusCount } from '../../../../api/tracking';
import { getCurrentDate } from '../../../../utils/statusUtils';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Package from './assets/package.png';
import Square from './assets/minus-square.png';
import SandBox from './assets/codesandbox.png';
import { motion } from 'framer-motion';

const statCards = [
  {
    key: 'total_tracking_generated',
    label: "Total ID's Generated",
    icon: SandBox,
    alt: 'Sandbox',
    bgColor: 'bg-primary/25',
    border: '',
  },
  {
    key: 'delivered_status_count',
    label: 'Order Completed',
    icon: Package,
    alt: 'Package',
    bgColor: 'bg-[#B4D479]/25',
    border: 'md:border-x border-gray-500',
    suffix: 'items',
  },
  {
    key: 'returned_status_count',
    label: 'Orders Returned',
    icon: Square,
    alt: 'Square',
    bgColor: 'bg-primary/25',
    border: '',
    suffix: 'items',
  },
];

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
        setStatsLoading(false);
        return;
      }
      try {
        setStatsLoading(true);
        setStatsError(null);
        const data = await fetchStatusCount();
        setStats(data);
      } catch (error: any) {
        setStatsError(
          error.response?.status === 401
            ? 'Session expired. Please log in again.'
            : 'Failed to load statistics. Please try again.'
        );
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="w-full">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between mt-6 sm:mt-8 pb-4 px-2"
      >
        <p className="text-sm sm:text-base font-medium">Overview</p>
        <div className="flex items-center gap-1.5 text-[#828282]">
          <CalendarTodayOutlinedIcon sx={{ width: 14, height: 14 }} />
          <p className="text-xs sm:text-sm">{getCurrentDate()}</p>
        </div>
      </motion.div>

      {/* Error */}
      {statsError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-xs sm:text-sm"
        >
          {statsError}
        </motion.div>
      )}

      {/* Loading */}
      {statsLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded text-xs sm:text-sm"
        >
          Loading statistics...
        </motion.div>
      )}

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col md:flex-row bg-slate-600 rounded-md text-white overflow-hidden"
      >
        {statCards.map(({ key, label, icon, alt, bgColor, border, suffix }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className={`flex-1 flex justify-center items-center gap-3 px-6 sm:px-10 md:px-8 lg:px-16 py-6 md:py-10 ${border} border-b border-gray-500 md:border-b-0 last:border-b-0`}
          >
            {/* Icon */}
            <div className={`${bgColor} p-2 rounded-full flex-shrink-0`}>
              <img src={icon} alt={alt} className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            {/* Text */}
            <div className="text-left">
              <p className="text-xs sm:text-sm md:text-base font-medium text-[#D1E8FA] leading-snug">
                {label}
              </p>
              <p className="text-xl sm:text-2xl font-semibold">
                {stats[key as keyof typeof stats]}
                {suffix && (
                  <span className="text-sm sm:text-base font-medium text-[#D1E8FA] ml-1">
                    {suffix}
                  </span>
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};

export default Overview;