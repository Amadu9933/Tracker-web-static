import React from 'react';
import { getStatusColor } from '../../../../../utils/statusUtils';
import { useTheme } from '../../../../../context/ThemeContext';

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
 * RecentUpdate table component without Material UI and limited to 4 rows.
 */
const RecentUpdate: React.FC<RecentUpdateProps> = ({ trackingData = [] }) => {
  const { isDarkMode } = useTheme();

  if (!Array.isArray(trackingData)) {
    console.error('Invalid data prop passed to RecentUpdate. Expected an array.');
    return null;
  }

  return (
    <div className="max-h-[500px] overflow-auto">
      <table className={`w-full text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
        <thead>
          <tr>
            <th className={`text-left p-2 ${isDarkMode ? 'text-gray-300' : 'text-[#5D5D4C]'}`}></th>
            <th className={`text-right p-2 ${isDarkMode ? 'text-gray-300' : 'text-[#5D5D4C]'}`}></th>
          </tr>
        </thead>
        <tbody>
          {trackingData.slice(0, 4).map((item, index) => {
            const color = getStatusColor(item.status);

            return (
              <tr
                key={index}
                className={`flex flex-col sm:table-row sm:border-none border-b ${isDarkMode ? 'border-zinc-700' : 'border-[#D9E1E7]'} ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}
              >
                <td className={`p-2 align-top sm:w-auto w-full ${isDarkMode ? 'text-gray-200' : 'text-[#5D5D4C]'}`}>
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
                <td className={`p-2 text-right align-top sm:w-auto w-full ${isDarkMode ? 'text-gray-200' : 'text-[#5D5D4C]'}`}>
                  <div className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-100' : ''}`}>{item.date_of_purchase}</div>
                  <div className={`${isDarkMode ? 'text-zinc-400' : 'text-[#A3A38E]'} text-sm`}>{item.time_of_purchase} hrs</div>
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