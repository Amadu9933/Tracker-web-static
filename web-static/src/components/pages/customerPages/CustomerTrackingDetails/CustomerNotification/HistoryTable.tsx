import React from 'react';

interface CustomizedTablesProps {
  trackingData: any[];
}

/**
 * Returns the color associated with the given status.
 */
const getStatusColor = (status: string) => {
  switch (status.trim().toLowerCase()) {
    case 'delivered':
      return 'text-green-600';
    case 'cancelled':
    case 'canceled':
      return 'text-red-500';
    case 'returned':
      return 'text-orange-500';
    case 'in transit':
      return 'text-blue-400';
    case 'pending':
      return 'text-yellow-500';
    default:
      return 'text-gray-600';
  }
};

/**
 * Formats a given datetime string into a JSX element with date and time separated.
 */
const formatDateTime = (datetime: string) => {
  const [date, time] = datetime.split(' ');
  return (
    <span>
      {date}
      <br />
      <span className="text-gray-400">{time} hrs</span>
    </span>
  );
};

/**
 * Main Reusable Table Component.
 */
const CustomizedTables: React.FC<CustomizedTablesProps> = ({ trackingData = [] }) => {
  if (!Array.isArray(trackingData)) {
    console.error('Invalid data prop passed to CustomizedTables. Expected an array.');
    return null;
  }

  return (
    <div className="overflow-auto max-h-[500px] border border-gray-300 rounded-lg">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="p-3 border border-gray-300">#</th>
            <th className="p-3 border border-gray-300 w-[539px]">Tracking Number</th>
            <th className="p-3 border border-gray-300">Date Ordered</th>
            <th className="p-3 border border-gray-300">Date Delivered</th>
            <th className="p-3 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {trackingData.map((item: any, index: number) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              <td className="p-3 border border-gray-300">#{index + 1}</td>
              <td className="p-3 border border-gray-300">{item.parcel_number}</td>
              <td className="p-3 border border-gray-300">{formatDateTime(item.date_of_purchase)}</td>
              <td className="p-3 border border-gray-300">{formatDateTime(item.delivery_date)}</td>
              <td className={`p-3 border border-gray-300 font-semibold ${getStatusColor(item.status)}`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomizedTables;
