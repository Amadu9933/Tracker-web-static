import React from 'react';

interface TrackingDataItem {
  status: string;
  parcel_number: string;
  details: {
    status1: string;
    status2: string;
  };
  date_of_purchase: string;
  time_of_purchase: string;
}

interface RecentUpdateProps {
  trackingData: TrackingDataItem[];
}

/**
 * Returns the Tailwind color associated with the given status.
 */
const getStatusColor = (status: string) => {
  const trimmedStatus = status.trim().toLowerCase();
  switch (trimmedStatus) {
    case 'delivered':
      return 'bg-[#B4D479]';
    case 'on the way':
      return 'bg-[#FFE393]';
    case 'cancelled':
    case 'canceled':
      return 'bg-[#EA8389]';
    case 'returned':
      return 'bg-[#FFC19E]';
    case 'in transit':
      return 'bg-[#87CEEB]';
    case 'pending':
      return 'bg-[#FFA500]';
    default:
      return 'bg-black';
  }
};

/**
 * RecentUpdate table component without Material UI and limited to 4 rows.
 */
const RecentUpdate: React.FC<RecentUpdateProps> = ({ trackingData = [] }) => {
  if (!Array.isArray(trackingData)) {
    console.error('Invalid data prop passed to RecentUpdate. Expected an array.');
    return null;
  }

  return (
    <div className="max-h-[500px] overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left text-[#5D5D4C] p-2"></th>
            <th className="text-right text-[#5D5D4C] p-2"></th>
          </tr>
        </thead>
        <tbody>
          {trackingData.slice(0, 4).map((item, index) => {
            const color = getStatusColor(item.status);

            return (
              <tr
                key={index}
                className="flex flex-col sm:table-row sm:border-none border-b border-[#D9E1E7]"
              >
                <td className="p-2 align-top text-[#5D5D4C] sm:w-auto w-full">
                  <div className="flex items-start sm:flex-row flex-col">
                    <span
                      className={`inline-block w-4 h-4 rounded-full ${color} sm:mr-2 sm:mt-1 mb-2`}
                    ></span>
                    <div>
                      <div className="text-sm sm:text-base">
                        Your order - {item.details.status1}
                      </div>
                      <div className="text-[#A3A38E] sm:ml-6 text-sm">
                        {item.details.status2}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-2 text-right align-top text-[#5D5D4C] sm:w-auto w-full">
                  <div className="text-sm sm:text-base">{item.date_of_purchase}</div>
                  <div className="text-[#A3A38E] text-sm">{item.time_of_purchase} hrs</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentUpdate;