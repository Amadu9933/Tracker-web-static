import { useEffect, useState, useMemo, useCallback } from 'react';
import { fetchTrackingData } from '../../../../api/tracking';
import { getStatusColor, formatDateTime } from '../../../../utils/statusUtils';
import CircularProgress from '../../customerPages/customerTrackingDetails/customerNotification/CircularProgress';
import LoadingSpinner from '../../customerPages/customerTrackingDetails/customerNotification/LoadingSpinner';

const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST; // Use environment variable for base URL

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
  const [trackingData, setTrackingData] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

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
      const data = await fetchTrackingData(url, token);
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
        <div className="flex justify-between items-center mb-4">
          <p className="text-secondary font-bold">History</p>
          <div className="flex justify-end border border-gray-300 rounded-md px-4 py-2 text-sm">
            <div className="mr-2">Sort by:</div>
            <select
              value={statusFilter}
              onChange={handleFilterChange}
              className="outline-none bg-white"
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
      <div className="overflow-x-auto border border-gray-300 rounded-lg max-h-[500px] overflow-y-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 font-medium text-[#537086] sticky top-0">
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
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
              >
                <td className="px-4 py-3">#{index + 1}</td>
                <td className="px-4 py-3">{item.parcel_number}</td>
                <td className="px-4 py-3">
                  {formatDateTime(item.date_of_purchase)}
                  <div className="text-[#C6C5B9] text-xs">{formatDateTime(item.time_of_purchase)}</div>
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
