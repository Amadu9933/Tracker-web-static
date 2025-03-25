import { useEffect, useState } from 'react';
import axios from 'axios';

// ---------- Utilities ----------
const getStatusColor = (status: string) => {
  switch (status.trim().toLowerCase()) {
    case 'delivered': return 'text-green-600';
    case 'canceled': return 'text-red-500';
    case 'returned': return 'text-orange-500';
    case 'in transit': return 'text-blue-400';
    case 'pending': return 'text-yellow-500';
    default: return 'text-gray-600';
  }
};

const formatDateTime = (datetime: string) => {
  if (!datetime) return '-';
  const [date, time] = datetime.split(' ') || ['', ''];

  // Convert to 24-hour format
  const cleanedTime = time?.replace(/hrs|HRS|Hr|hr/g, '').trim();
  const tempDate = new Date(`1970-01-01T${cleanedTime}`);
  const formattedTime = !isNaN(tempDate.getTime())
    ? tempDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
    : cleanedTime;

  return (
    <span>
      {date}
      <br />
      <span className="text-[#C6C5B9] text-xs">{formattedTime}</span>
    </span>
  );
};

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
  const fetchTrackingData = async (
    url = 'https://trackerr.live/api/v1/trackings/',
    append: boolean = false
  ) => {
    const token = localStorage.getItem('access');
    if (!token) {
      setError('Authentication token missing. Please login again.');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      console.log('Fetched Data:', response.data);
      const newData = response.data.results || [];

      setTrackingData((prev) => (append ? [...prev, ...newData] : newData)); // Append or replace
      setNextPage(response.data.next); // Save next page URL
    } catch (err: any) {
      console.error('Failed to fetch tracking data:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError('Failed to fetch tracking data.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------- Initial Fetch ----------
  useEffect(() => {
    fetchTrackingData();
  }, []);

  // ---------- Handle Filter Change ----------
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStatusFilter(value);
  };

  // ---------- Handle Load More ----------
  const handleLoadMore = () => {
    if (nextPage) {
      fetchTrackingData(nextPage, true);
    }
  };

  // ---------- Filter & Limit ----------
  const filteredData = statusFilter === 'All'
    ? trackingData
    : trackingData.filter((item) => item.status?.toLowerCase() === statusFilter.toLowerCase());

  const dataToShow = limit ? filteredData.slice(0, limit) : filteredData;

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
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-orange-500 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {/* Error & Loading Message */}
      {loading && trackingData.length === 0 && <p className="text-center py-4">Loading data...</p>}
      {error && <p className="text-center py-4 text-red-500">{error}</p>}
    </div>
  );
};

export default CustomizedTables;
