import React from "react";

const DetailTable: React.FC = () => {
	// Define your data
	const tableData = {
		"Parcel number": "N3858678564S",
		"Date of purchase": "03/09/2023",
		"Estimated delivery date": "05/09/2023",
		"Shipping address": "No. 5 Osapa London, Lekki phase 1",
		Vendor: "Sandwear Company",
		Status: "Pending",
	};

	return (
		<div>
			<table>
				<tbody>
					{/* Iterate over the object keys to create rows */}
					{Object.entries(tableData).map(([key, value], index) => (
						<tr key={index}>
							<td
								className={
									key === "Parcel number"
										? "text-blue-500 text-left"
										: "text-left text-red-900 pr-24"
								}>
								{key}
							</td>
							<td
								className={
									key === "Status" && value === "Pending"
										? "text-green-500 text-left"
										: "text-left"
								}>
								{value}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DetailTable;

{
	/* 



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SimpleTable = () => {
    // Define state to store fetched data
    const [tableData, setTableData] = useState(null);

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const response = await axios.get('YOUR_API_ENDPOINT');
            setTableData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once

    // Render loading message while fetching data
    if (!tableData) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <table>
                <tbody>
                
                    {Object.entries(tableData).map(([key, value], index) => (
                        <tr key={index}>
                            <td className={key === 'Parcel number' ? 'text-blue-500' : 'text-left'}>{key}</td>
                            <td className={
                                (key === 'Date of purchase' || key === 'Shipping address') 
                                ? 'text-yellow-500 text-left' 
                                : key === 'Status' && value === 'Pending' 
                                ? 'text-green-500 text-left' 
                                : 'text-left'
                            }>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SimpleTable;



*/
}
