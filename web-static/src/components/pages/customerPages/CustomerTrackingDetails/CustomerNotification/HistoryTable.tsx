import { getStatusColor, formatDateTime } from '../../../../../utils/statusUtils';
import { useTheme } from '../../../../../context/ThemeContext';

interface CustomizedTablesProps {

  trackingData: any[];
}

/**
 * Main Reusable Table Component.
 */
const CustomizedTables: React.FC<CustomizedTablesProps> = ({ trackingData = [] }) => {
  const { isDarkMode } = useTheme();

  if (!Array.isArray(trackingData)) {
    console.error('Invalid data prop passed to CustomizedTables. Expected an array.');
    return null;
  }

  return (
    <div className="">
      <div className={`overflow-auto max-h-[500px] rounded-lg ${isDarkMode ? 'border border-zinc-700' : 'border border-gray-300'}`}>
        <table className={`min-w-full text-sm text-left ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <thead className={`${isDarkMode ? 'bg-zinc-900 text-gray-300' : 'bg-gray-100 text-gray-600'} uppercase`}>
            <tr>
              <th className={`p-3 border ${isDarkMode ? 'border-zinc-700' : 'border-gray-300'}`}>#</th>
              <th className={`p-3 border ${isDarkMode ? 'border-zinc-700' : 'border-gray-300'} w-[539px]`}>Tracking Number</th>
              <th className={`p-3 border ${isDarkMode ? 'border-zinc-700' : 'border-gray-300'}`}>Date Ordered</th>
              <th className={`p-3 border ${isDarkMode ? 'border-zinc-700' : 'border-gray-300'}`}>Date Delivered</th>
              <th className={`p-3 border ${isDarkMode ? 'border-zinc-700' : 'border-gray-300'}`}>Status</th>
            </tr>
          </thead>
          <tbody>
            {trackingData.map((item: any, index: number) => (
              <tr
                key={item.id}
                className={
                  isDarkMode
                    ? index % 2 === 0
                      ? 'bg-zinc-800 text-white'
                      : 'bg-zinc-700 text-white'
                    : index % 2 === 0
                      ? 'bg-white text-black'
                      : 'bg-gray-50 text-black'
                }
              >
                <td className={`p-3 border ${isDarkMode ? 'border-zinc-700' : 'border-gray-300'}`}>#{index + 1}</td>
                <td className={`p-3 border ${isDarkMode ? 'border-zinc-700' : 'border-gray-300'}`}>{item.parcel_number}</td>
                <td className={`p-3 border ${isDarkMode ? 'border-zinc-700' : 'border-gray-300'}`}>{formatDateTime(item.date_of_purchase)}</td>
                <td className={`p-3 border ${isDarkMode ? 'border-zinc-700' : 'border-gray-300'}`}>{formatDateTime(item.delivery_date)}</td>
                <td className={`p-3 border ${isDarkMode ? 'border-zinc-700' : 'border-gray-300'} font-semibold ${getStatusColor(item.status)}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomizedTables;
