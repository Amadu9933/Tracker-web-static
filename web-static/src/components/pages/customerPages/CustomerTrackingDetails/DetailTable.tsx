import React from 'react';

const DetailTable: React.FC = () => {
    // Define your data
    const tableData = [
        { key: 'Parcel number', value: 'N3858678564S' },
        { key: 'Date of purchase', value: '03/09/2023' },
        { key: 'Estimated delivery date', value: '05/09/2023' },
        { key: 'Shipping address', value: 'No. 5 Osapa London, Lekki phase 1' },
        { key: 'Vendor', value: 'Sandwear Company' },
        { key: 'Status', value: 'Pending' }
    ];

    return (
        <div>
            <table>
                <tbody>
                    {/* Map through the data array to create rows */}
                    {tableData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.key}</td>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DetailTable;

