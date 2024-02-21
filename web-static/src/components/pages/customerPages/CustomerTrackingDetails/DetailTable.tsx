import React from 'react';

const DetailTable: React.FC = () => {
    // Define your data
    const tableData = {
        'Parcel number': 'N3858678564S',
        'Date of purchase': '03/09/2023',
        'Estimated delivery date': '05/09/2023',
        'Shipping address': 'No. 5 Osapa London, Lekki phase 1',
        'Vendor': 'Sandwear Company',
        'Status': 'Pending'
    };

    return (
        <div>
            <table>
                <tbody>
                    {/* Iterate over the object keys to create rows */}
                    {Object.entries(tableData).map(([key, value], index) => (
                        <tr key={index}>
                            <td className={key === 'Parcel number' ? 'text-blue-500' : 'text-left'}>{key}</td>
                            <td className={key === 'Status' && value === 'Pending' ? 'text-green-500' : 'text-left'}>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    );
};

export default DetailTable;


import React from 'react';

const SimpleTable = () => {
    // Define your data
    const tableData = {
        'Parcel number': 'N3858678564S',
        'Date of purchase': '03/09/2023',
        'Estimated delivery date': '05/09/2023',
        'Shipping address': 'No. 5 Osapa London, Lekki phase 1',
        'Vendor': 'Sandwear Company',
        'Status': 'Pending'
    };

    return (
        <div>
            <table>
                <tbody>
                    {/* Iterate over the object keys to create rows */}
                    {Object.entries(tableData).map(([key, value], index) => (
                        <tr key={index}>
                            <td className={key === 'Parcel number' ? 'text-blue-500' : 'text-left'}>{key}</td>
                            <td className={key === 'Status' && value === 'Pending' ? 'text-green-500' : 'text-left'}>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SimpleTable;


