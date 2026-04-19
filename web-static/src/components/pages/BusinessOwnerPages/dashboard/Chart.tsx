import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
} from 'recharts';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useTheme } from '../../../../context/ThemeContext';

const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;

interface DataPoint {
  day: string;
  orders: number;
}

const ParcelChart: React.FC = () => {
  const [filter, setFilter] = useState<'last7Days' | 'monthly'>('last7Days');
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isDarkMode } = useTheme(); // ✅ destructured here

  const API_ENDPOINTS = {
    last7Days: `${TRACKERR_HOST}/trackings/charts/weekly/`,
    monthly: `${TRACKERR_HOST}/trackings/charts/monthly/`,
  };

  const transformChartData = (dataObj: Record<string, number>): DataPoint[] =>
    Object.entries(dataObj).map(([day, orders]) => ({ day, orders }));

  const fetchChartData = async (key: keyof typeof API_ENDPOINTS) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('access');
    if (!token) {
      setError('Authentication token missing. Please login again.');
      setLoading(false);
      return;
    }

    const cacheKey = `chartData:${key}`;
    const cached = localStorage.getItem(cacheKey);
    if (!navigator.onLine && cached) {
      setChartData(JSON.parse(cached));
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(API_ENDPOINTS[key], {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      });
      const transformedData = transformChartData(response.data);
      setChartData(transformedData);
      localStorage.setItem(cacheKey, JSON.stringify(transformedData));
    } catch (err: any) {
      if (cached) {
        setChartData(JSON.parse(cached));
      } else {
        setError('Failed to load chart data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData(filter);
  }, [filter]);

  const handleFilterChange = (event: SelectChangeEvent<'last7Days' | 'monthly'>) => {
    setFilter(event.target.value as typeof filter);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col bg-white dark:bg-[#0F172A] dark:border dark:border-gray-700 rounded-xl text-secondary dark:text-slate-200 p-3 sm:p-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex justify-between items-center " // leaned up malformed className
      >
        <h2 className="text-sm sm:text-base font-semibold">Activity Chart</h2>
        <FormControl variant="outlined" size="small" className="">
          <Select
            value={filter}
            onChange={handleFilterChange}
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              //  Dark mode applied to MUI Select via sx prop
              color: isDarkMode ? '#e2e8f0' : 'inherit',
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode ? '#475569' : '#d1d5db',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode ? '#94a3b8' : '#9ca3af',
              },
              '& .MuiSvgIcon-root': {
                color: isDarkMode ? '#94a3b8' : 'inherit',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  // ✅ Dark mode applied to dropdown menu paper
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  color: isDarkMode ? '#e2e8f0' : 'inherit',
                  border: isDarkMode ? '1px solid #475569' : 'none',
                },
              },
            }}
          >
            <MenuItem
              value="last7Days"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                '&:hover': { backgroundColor: isDarkMode ? '#334155' : '#f3f4f6' },
              }}
            >
              Last 7 Days
            </MenuItem>
            <MenuItem
              value="monthly"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                '&:hover': { backgroundColor: isDarkMode ? '#334155' : '#f3f4f6' },
              }}
            >
              Monthly
            </MenuItem>
          </Select>
        </FormControl>
      </motion.div>

      {/* Error */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 dark:text-red-300 text-xs sm:text-sm text-center"
        >
          {error}
        </motion.p>
      )}

      {/* Loading */}
      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs sm:text-sm text-center text-gray-500 dark:text-gray-300"
        >
          Loading chart...
        </motion.p>
      )}

      {/* Chart */}
      {!loading && !error && chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0.95 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-grow min-h-[180px] sm:min-h-[220px] "
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 16, left: 0, bottom: 0 }}

            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  {/* ✅ Gradient adapts to dark mode */}
                  <stop
                    offset="5%"
                    stopColor={isDarkMode ? '#1e90ff' : '#B5EFF9'}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor={isDarkMode ? '#0F172A' : '#FEFEFE'}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                interval={0}
                tick={{
                  fontSize: 11,
                  fill: isDarkMode ? '#94a3b8' : '#6b7280', // ✅ axis labels
                }}
                axisLine={{ stroke: isDarkMode ? '#334155' : '#e5e7eb' }} //  axis line
                tickLine={{ stroke: isDarkMode ? '#334155' : '#e5e7eb' }} // tick marks
                padding={{ left: 10, right: 10 }}
              />
              <Tooltip
                contentStyle={{
                  fontSize: '0.75rem',
                  // ✅ Tooltip dark mode styles
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  border: `1px solid ${isDarkMode ? '#475569' : '#e5e7eb'}`,
                  color: isDarkMode ? '#e2e8f0' : '#111827',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: isDarkMode ? '#94a3b8' : '#6b7280' }}
                cursor={{ stroke: isDarkMode ? '#475569' : '#d1d5db', strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#1e90ff"
                fill="url(#colorGradient)"
                fillOpacity={1}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke={isDarkMode ? '#60a5fa' : '#1e90ff'} // ✅ line color in dark mode
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* No data */}
      {!loading && !error && chartData.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-300"
        >
          No data available.
        </motion.p>
      )}
    </motion.div>
  );
};

export default ParcelChart;