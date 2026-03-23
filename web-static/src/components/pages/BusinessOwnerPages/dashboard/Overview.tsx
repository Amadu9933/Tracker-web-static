import { useEffect, useState } from 'react';
import { fetchStatusCount } from '../../../../api/tracking';
import { getCurrentDate } from '../../../../utils/statusUtils';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Package from './assets/package.png';
import Square from './assets/minus-square.png';
import SandBox from './assets/codesandbox.png';
import { motion } from 'framer-motion';
import { useTheme } from '../../../../context/ThemeContext'; // ✅ import useTheme

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
    border: 'md:border-x border-gray-500 dark:border-gray-600',
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
  const { isDarkMode } = useTheme(); // ✅ destructure isDarkMode

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
        {/* ✅ Title respects dark mode text */}
        <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-slate-200">
          Overview
        </p>
        {/* ✅ Date text and icon adapt to dark mode */}
        <div className={`flex items-center gap-1.5 ${isDarkMode ? 'text-slate-400' : 'text-[#828282]'}`}>
          <CalendarTodayOutlinedIcon
            sx={{
              width: 14,
              height: 14,
              color: isDarkMode ? '#94a3b8' : '#828282', // ✅ icon color via sx
            }}
          />
          <p className="text-xs sm:text-sm">{getCurrentDate()}</p>
        </div>
      </motion.div>

      {/* Error */}
      {statsError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // ✅ Error banner dark mode
          className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded text-xs sm:text-sm"
        >
          {statsError}
        </motion.div>
      )}

      {/* Loading */}
      {statsLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // ✅ Loading banner dark mode
          className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 border border-blue-400 dark:border-blue-600 text-blue-700 dark:text-blue-300 rounded text-xs sm:text-sm"
        >
          Loading statistics...
        </motion.div>
      )}

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        // ✅ Container: dark slate in dark mode, lighter slate in light mode
        className="flex flex-col md:flex-row bg-slate-600 dark:bg-[#0F172A] dark:border dark:border-gray-700 rounded-md text-white overflow-hidden"
      >
        {statCards.map(({ key, label, icon, alt, bgColor, border, suffix }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className={`flex-1 flex justify-center items-center gap-3 px-6 sm:px-10 md:px-8 lg:px-16 py-6 md:py-10 ${border} border-b border-gray-500 dark:border-gray-700 md:border-b-0 last:border-b-0`}
          >
            {/* Icon */}
            <div className={`${bgColor} dark:bg-white/10 p-2 rounded-full flex-shrink-0`}>
              <img src={icon} alt={alt} className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            {/* Text */}
            <div className="text-left">
              {/* ✅ Label: soft blue in light, muted slate in dark */}
              <p className="text-xs sm:text-sm md:text-base font-medium text-[#D1E8FA] dark:text-slate-400 leading-snug">
                {label}
              </p>
              {/* ✅ Stat number: white in light mode card, bright white in dark */}
              <p className="text-xl sm:text-2xl font-semibold text-white dark:text-slate-100">
                {stats[key as keyof typeof stats]}
                {suffix && (
                  <span className="text-sm sm:text-base font-medium text-[#D1E8FA] dark:text-slate-400 ml-1">
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