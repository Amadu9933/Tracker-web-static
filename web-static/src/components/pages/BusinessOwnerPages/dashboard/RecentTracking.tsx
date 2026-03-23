import { useEffect, useState, useMemo, useCallback } from 'react';
import { fetchTrackingData } from '../../../../api/tracking';
import { getStatusColor, formatDateTime } from '../../../../utils/statusUtils';
import CircularProgress from '../../customerPages/CustomerTrackingDetails/CustomerNotification/CircularProgress';
import LoadingSpinner from '../../customerPages/CustomerTrackingDetails/CustomerNotification/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../context/ThemeContext';
// removed unused import 'object'

const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST; // Use environment variable for base URL



// ---------- Props Interface ----------
interface CustomizedTablesProps {
  enableFilter?: boolean; // Optional filter dropdown
  enableLoadMore?: boolean; // Optional Load More button
  limit?: number | null; // Optional row limit
}

// ---------- Main Component ----------
const CustomizedTables: React.FC<CustomizedTablesProps> = ({
  enableFilter = false,
  enableLoadMore = false,
  limit = null,
}) => {
  const { isDarkMode } = useTheme();
  const [trackingData, setTrackingData] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const navigate = useNavigate();


  // ---------- Handle ID Click ----------
  const handleIdClick = (url: string, state?: any) => {
    // pass state directly instead of nesting under a `state` key
    navigate(url, { state });
  };
  // ---------- Fetch Data ----------
  const fetchData = async (
    url = 'trackings/',
    append: boolean = false
  ) => {
    const token = localStorage.getItem('access');
    if (!token) {
      setError('Authentication token missing. Please login again.');
      setLoading(false);
      return;
    }
    setLoading(true);
    const cacheKey = `recentTracking:${url}`;
    const cached = localStorage.getItem(cacheKey);
    if (!navigator.onLine && cached) {
      const cachedData = JSON.parse(cached);
      setTrackingData((prev) => (append ? [...prev, ...cachedData.results] : cachedData.results));
      setNextPage(cachedData.next);
      setLoading(false);
      return;
    }
    try {
      const data = await fetchTrackingData(url);
      const newData = data.results || [];
      setTrackingData((prev) => (append ? [...prev, ...newData] : newData));
      setNextPage(data.next);
      // Cache the data
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (err: any) {
      console.error('Failed to fetch tracking data:', err);
      if (cached) {
        const cachedData = JSON.parse(cached);
        setTrackingData((prev) => (append ? [...prev, ...cachedData.results] : cachedData.results));
        setNextPage(cachedData.next);
        setError(null);
      } else {
        setError('Failed to fetch tracking data.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------- Initial Fetch ----------
  useEffect(() => {
    fetchData();
  }, []);

  // ---------- Filter & Limit ----------
  const filteredData = useMemo(() => (
    statusFilter === 'All'
      ? trackingData
      : trackingData.filter((item) => item.status?.toLowerCase() === statusFilter.toLowerCase())
  ), [trackingData, statusFilter]);

  const dataToShow = useMemo(() => (
    limit ? filteredData.slice(0, limit) : filteredData
  ), [filteredData, limit]);

  // ---------- Handlers (memoized) ----------
  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStatusFilter(value);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (nextPage) {
      const relativeUrl = nextPage.replace(`${TRACKERR_HOST}/`, '');
      fetchData(relativeUrl, true);
    }
  }, [nextPage]);

  // ---------- Render ----------
  return (
    <div className="w-full">
      {/* Filter Dropdown */}
      {enableFilter && (
        <div className={`flex justify-between items-center mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <p className="text-secondary font-bold">History</p>
          <div className={`flex justify-end rounded-md px-4 py-2 text-sm ${isDarkMode ? 'border border-zinc-700 bg-zinc-900' : 'border border-gray-300 bg-white'}`}>
            <div className="mr-2">Sort by:</div>
            <select
              value={statusFilter}
              onChange={handleFilterChange}
              className={`outline-none ${isDarkMode ? 'bg-zinc-900 text-white border border-zinc-700' : 'bg-white text-black'}`}
            >
              <option value="All">All</option>
              <option value="delivered">Delivered</option>

              <option value="canceled">Canceled</option>
              <option value="returned">Returned</option>
              <option value="in transit">In Transit</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      )}

      {/* Table */}
      <div className={`overflow-x-auto rounded-lg max-h-[500px] overflow-y-auto ${isDarkMode ? 'border border-zinc-700 bg-zinc-900' : 'border border-gray-300 bg-white'}`}>
        <table className={`min-w-full text-left text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <thead className={`${isDarkMode ? 'bg-zinc-900 text-gray-300' : 'bg-gray-100 text-[#537086]'} font-medium sticky top-0`}>
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Tracking Number</th>
              <th className="px-4 py-3">Date Ordered</th>
              <th className="px-4 py-3">Date Delivered</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {dataToShow.map((item, index) => (
              <tr
                key={`${item.parcel_number}-${index}`} // ✅ Unique key
                className={`${index % 2 === 0 ? (isDarkMode ? 'bg-zinc-800' : 'bg-white') : (isDarkMode ? 'bg-zinc-700' : 'bg-gray-50')} ${isDarkMode ? 'text-white hover:bg-zinc-700' : 'text-black hover:bg-gray-100'}`}
              >
                <td className="px-4 py-3">#{index + 1}</td>
                <td className={`px-4 py-3 ${isDarkMode ? 'text-blue-300' : ''}`} style={{ cursor: 'pointer' }} onClick={() => { handleIdClick(`/dashboard/trackings/${item.parcel_number}/`, item) }}><span className='hover:underline'>{item.parcel_number}</span></td>
                <td className="px-4 py-3">
                  {formatDateTime(item.date_of_purchase)}
                  <div className={`${isDarkMode ? 'text-zinc-400' : 'text-[#C6C5B9]'} text-xs`}>{formatDateTime(item.time_of_purchase)}</div>
                </td>
                <td className="px-4 py-3">{formatDateTime(item.delivery_date)}</td>
                <td className={`px-4 py-3 font-semibold ${getStatusColor(item.status)}`}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More Button */}
      {enableLoadMore && nextPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-orange-500 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <LoadingSpinner /> : 'Load More'}
          </button>
        </div>
      )}

      {/* Error & Loading Message */}
      {loading && trackingData.length === 0 && <CircularProgress />}
      {error && <p className="text-center py-4 text-red-500">{error}</p>}
    </div>
  );
};

export default CustomizedTables;
