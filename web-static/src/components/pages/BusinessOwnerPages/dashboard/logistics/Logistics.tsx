// src/pages/BusinessOwnerPages/user/Profile.tsx

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowLeft, Trash2, Edit, Eye, MapPin, Phone, Plus } from "lucide-react";
import { Container } from "../trackingDetails/TrackingDetails";
import { ReusableDialog } from "@components/common/reusable/dialog";
import { useEffect, useState } from "react";
import axiosInstance from "@api/axiosInstance";
import MessageBox from "@components/common/reusable/messageBox";
import title from "@components/common/reusable/title";

const Integration = () => {

    const [showDialog, setShowDialog] =  useState(false);
    const [msg, setMsg] = useState('');
    const [riders, setRiders] = useState<any[]>([]);

    const validRatings = riders.filter(r => r.rating > 0);
    const average = (validRatings.reduce((sum, r) => sum + r.rating, 0) / validRatings.length).toFixed(1);
    console.log(average);


    const [riderInfo, setRiderInfo] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        idType: '',
        idNumber: ''
    });


    useEffect(() => {
        document.title = "Logistics - Tracker";
        axiosInstance.get('/logistics/business-owners/riders/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`
            }
        }).then((response) => {
            setRiders(response?.data?.msg || []);
        }).catch((error) => {
            console.log(error);
        });
    }, [msg])

    const createRider = (data: {name: string, address: string, phone_number: string, email: string, identity_card_type: string, id_number: string}) => {
        axiosInstance.post('/logistics/signup/', {...data, account_type: "logistics"}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
           setMsg('Rider created successfully');
           setTimeout(() => {
            setMsg('');
            // window.location.reload();
           }, 3000);
        }).catch((error) => {
            console.log(error);
            alert('Failed to create rider');
            setMsg('Failed to create rider');
            setTimeout(() => {
                setMsg('');
               }, 3000);
        });
        
    }

    const handleAddRider = () => {
        if (riderInfo.name === '' || riderInfo.address === '' || riderInfo.phone === '' || riderInfo.email === '' || riderInfo.idType === '' || riderInfo.idNumber === '') {
            alert('Please fill all fields');
            return;
        }
        console.log(riderInfo);
        createRider({...riderInfo, identity_card_type: riderInfo.idType, id_number: riderInfo.idNumber, phone_number: riderInfo.phone});
        setRiderInfo({
            name: '',
            address: '',
            phone: '',
            email: '',
            idType: '',
            idNumber: ''
        });
        setShowDialog(false);

        }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setRiderInfo((prev) => ({   
            ...prev,
            [id]: value
        }));
    }
    
    const handleShowDialog = () => {
        setShowDialog(!showDialog);
    }



    return (
        <div>
            <div className="flex bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex flex-col justify-center mr-2"><ArrowLeft className="w-6 h-6 cursor-pointer" /></div>
                <div className="flex flex-col ml-3">
                    <h6 className="font-bold text-2xl font-sans mb-2">Manage Riders</h6>
                    <p>Add, edit, and monitor your delivery riders</p>
                </div>
            </div>
            <section className="flex w-full justify-between gap-4 p-5">
                    <div className="w-[15rem] border h-[6rem] rounded-sm shadow-md">
                        <div className="flex flex-col justify-between h-full p-5 gap-2">
                            <div className="flex w-full justify-between">
                                <p className="text-md">Total Riders</p>
                                <FontAwesomeIcon icon={faUser} style={{fontSize: "0.8rem", marginTop: "3px"}} />
                            </div>
                            <h4 className="font-bold text-2xl">{riders.length}</h4>
                        </div>
                    </div>
                   <div className="w-[15rem] border h-[6rem] rounded-sm shadow-md">
                        <div className="flex flex-col justify-between h-full p-5 gap-2">
                            <div className="flex w-full justify-between items-center">
                                <p className="text-md">Active Riders</p>
                                <div className="rounded-full h-2 w-2 bg-green-500"></div>
                            </div>
                            <h4 className="font-bold text-2xl text-green-500">
                                {
                                    riders.filter(rider => rider.status.toLowerCase() === 'active').length
                                }
                            </h4>
                        </div>
                    </div>
                    <div className="w-[15rem] border h-[6rem] rounded-sm shadow-md">
                        <div className="flex flex-col justify-between h-full p-5 gap-2">
                            <div className="flex w-full justify-between items-center">
                                <p className="text-md">Busy Riders</p>
                                <div className="rounded-full h-2 w-2 bg-orange-400"></div>
                            </div>
                            <h4 className="font-bold text-2xl text-orange-400">
                                {
                                    riders.filter(rider => rider.status.toLowerCase() === 'busy').length
                                }
                            </h4>
                        </div>
                    </div>

                    <div className="w-[15rem] border h-[6rem] rounded-sm shadow-md">
                        <div className="flex flex-col justify-between h-full p-5 gap-2">
                            <div className="flex w-full justify-between items-center">
                                <p className="text-md">Average Rating</p>
                                <div className="flex items-center gap-1">⭐</div>
                            </div>
                            <h4 className="font-bold text-2xl">
                                {
                                    isNaN(parseFloat(average)) ? '0.0' : average
                                }
                            </h4>
                        </div>
                    </div>   
            </section>
            <div style={{display: showDialog ? 'block' : 'none'}}>
                <ReusableDialog> 
                        <div className="flex">
                                <div className="flex justify-between w-full">
                                    <div className="flex flex-col">
                                        <h2 className="font-medium">Assign New Rider</h2>
                                        <p className="">Add a new rider to your delivery team</p>
                                    </div>
                                    <span className="cursor-pointer" onClick={handleShowDialog}>X</span>
                                </div>
                        </div>
                        <div className="flex flex-col mt-4">
                            <form className="w-full mt-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2" htmlFor="name">Rider Name</label>
                                        <input className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 placeholder:p-1" type="text" id="name" placeholder="John Doe"
                                            onChange={(e) => handleInputChange(e)}
                                            value={riderInfo.name}
                                        />
                                    </div> 
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email address</label>
                                        <input className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 placeholder:p-1" type="text" id="email" placeholder="johndoe@example.com"
                                            onChange={(e) => handleInputChange(e)}
                                            value={riderInfo.email}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2" htmlFor="address">Address</label>
                                        <input className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 placeholder:p-1" type="text" id="address" placeholder="36 accra avenue" 
                                            onChange={(e) => handleInputChange(e)}
                                            value={riderInfo.address}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone Number</label>
                                        <input className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 placeholder:p-1" type="text" id="phone" placeholder="7037676797" 
                                            onChange={(e) => handleInputChange(e)}
                                            value={riderInfo.phone}
                                        />
                                    </div>
                    
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2" htmlFor="idType">Identity Card Type</label>
                                        <select className="w-full border border-gray-300 p-3 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 placeholder:p-1 p-1" id="idType"
                                            onChange={(e) => handleInputChange(e)}
                                            value={riderInfo.idType}
                                        >
                                            <option value="select">Select ID Type</option>
                                            <option value="driver's license">Driver's License</option> 
                                            <option value="national id">National ID</option>
                                            <option value="voter's card">Voter's Card</option>
                                            <option value="passport">Passport</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2" htmlFor="idNumber">Identity Card Number</label>
                                        <input className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 placeholder:p-1" type="text" id="idNumber" placeholder="22349053635" 
                                            onChange={(e) => handleInputChange(e)}
                                            value={riderInfo.idNumber}
                                        />
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <button type="button" onClick={handleShowDialog} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancel</button>
                                        <button type="button" className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                                            onClick={handleAddRider}
                                        >Add Rider</button>
                                    </div>
                                </form>
                        </div>
                </ReusableDialog>
            </div>
            <section className="">
                <Container>
                    <div className="flex justify-between bg-white">
                        <div className="flex flex-col ml-3">
                            <h6 className="font-bold text-xl font-sans mb-0">Riders List</h6>
                            <p className="text-sm">Manage your delivery team</p>
                        </div>
                        <div className="flex">
                            <input 
                                style={{width: "15rem", height: "0.2rem"}}
                                type="text"
                                placeholder="Search riders..."
                                onChange={(e) => {alert(e.target.value)}}
                                className="border border-gray-300 text-left placeholder:p-0 rounded-md h-[1rem] focus:outline-none focus:ring-1 focus:ring-orange-200"
                            />
                            <button className="bg-orange-500 flex justify-center items-center text-white text-sm px-2 py-0 rounded-md ml-2 hover:bg-[#FF833C] h-[2.5rem]" onClick={() => handleShowDialog()}><Plus /> Add Rider</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto mt-5 border">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Rider</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left pl-8 text-sm font-semibold text-gray-700">Contact</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left pl-8 text-sm font-semibold text-gray-700">Location</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left pl-8 text-sm font-semibold text-gray-700">Status</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left pl-8 text-sm font-semibold text-gray-700">Performance</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left pl-8 text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    riders.map((rider) => {
                                        return (
                                        <tr className="hover:bg-gray-100 cursor-default" key={rider.id}>
                                            <td className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                                            <span className="border p-1 rounded-full border-orange-400 mr-1"><FontAwesomeIcon icon={faUser} style={{fontSize: "0.8rem", marginTop: "3px", color: "#FF833C"}} /></span>  {title(rider.user.name.split(' ')[0])}
                                            </td>
                                            <td className="py-2 px-8 border-b border-gray-200  py-4 text-left text-sm font-semibold text-gray-700 flex flex-col">
                                                {
                                                    rider.user.country === 'nigeria' ? (
                                                        <p className="text-xs font-normal"><Phone className="w-3 h-3 inline"/>+234-{rider?.user?.phone_number}</p>
                                                    ) : (
                                                        <p className="text-xs font-normal"><Phone className="w-3 h-3 inline"/>+233-{rider?.user?.phone_number}</p>
                                                    )
                                                }
                                                <p className="text-xs font-normal">{rider.user.email}</p>
                                            </td>
                                            <td className="py-2 px-8 py-4 border-b border-gray-200  text-left text-sm font-semibold text-gray-700">
                                                <p className="text-xs font-normal flex gap-1"><MapPin className="w-3 h-3 "/>{title(rider.user.address)}</p>
                                            </td>
                                            <td className="py-2 px-8 py-4 border-b border-gray-200   text-left text-sm font-semibold text-gray-700">
                                                <div className="w-full flex items-center gap-1">
                                                    {
                                                        rider.status.toLowerCase() === "busy" ? (

                                                            <p className="text-xs font-normal border border-red-400 bg-red-50 text-center rounded-full px-2 text-red-500">{rider.status}</p>
                                                        ) : rider.status.toLowerCase() === 'inactive' ? (
                                                            <p className="text-xs font-normal border border-blue-400 bg-gray-50 text-center rounded-full px-2 text-black-400">{rider.status}</p>       
                                                        ) : (
                                                            <p className="text-xs font-normal border border-green-400 bg-green-50 text-center rounded-full px-2 text-green-500">{rider.status}</p>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                            <td className="py-2 px-7 py-4 border-b border-gray-200  text-left text-sm font-semibold text-gray-700 flex flex-col">
                                                <p className="text-xs font-semibold">{rider.total_delivery}/{rider.total_assigned_orders} deliveries</p>
                                                <p className="text-xs font-normal">⭐ {rider.rating} rating</p>
                                            </td>
                                            <td className="py-2 px-8 py-4 border-b border-gray-200  text-left text-sm font-semibold text-gray-700">
                                                <div className="flex gap-1 w-full justify-between">
                                                    <div className="border p-2 border-transparent hover:border-[#FF833C] rounded"><Eye className="cursor-pointer" size={15} onClick={() => alert('Clicked')}/></div>
                                                    <div className="border p-2 border-transparent hover:border-[#FF833C] rounded"><Edit className="cursor-pointer" size={15}  /></div>
                                                    <div className="border p-2 border-transparent hover:border-[#FF833C] rounded"><Trash2 className="cursor-pointer text-red-500" size={15}  /></div>
                                                </div>
                                            </td>
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </Container>
                <MessageBox message={msg} showMessage={msg !== ''} state={msg === 'Rider created successfully' ? 'success' : 'warning'} size='0.8rem' marginX='5rem' />
            </section>
        </div>
    );
};

export default Integration;
