import { getStatusColor, formatDateTime } from '../../../../../utils/statusUtils';

interface CustomizedTablesProps {

  trackingData: any[];
}

/**
 * Main Reusable Table Component.
 */
const CustomizedTables: React.FC<CustomizedTablesProps> = ({ trackingData = [] }) => {



  if (!Array.isArray(trackingData)) {
    console.error('Invalid data prop passed to CustomizedTables. Expected an array.');
    return null;
  }

  return (
    <div className=''>

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
    </div>
  );
};

export default CustomizedTables;
