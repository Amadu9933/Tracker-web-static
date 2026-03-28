import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useParams } from "react-router-dom";
import { User, MapPin, CheckCircle, Package, Truck } from 'lucide-react';
import { useEffect, useState } from "react";
import Dialog from "@components/common/reusable/dialog";
import axiosInstance from "@api/axiosInstance";
import React from "react";
import MessageBox from "@components/common/reusable/messageBox";
import title from "@components/utils/title";

function AddressAutocomplete({ user_data, setUserData }: { user_data: any; setUserData: (u: any) => void }) {
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const API_KEY = import.meta.env.VITE_HERE_API_KEY;

    const fetchSuggestions = async (value: any) => {
        if (!value) { setSuggestions([]); return; }
        try {
            const response = await fetch(
                `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${encodeURIComponent(value)}&apiKey=${API_KEY}&limit=10`
            );
            const data = await response.json();
            setSuggestions(data.items || []);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserData({ ...user_data, address: value });
        fetchSuggestions(value);
    };

    const handleSelect = (address: any) => {
        const country = (address as string).split(' ').pop()?.trim() || '';
        setUserData({ ...user_data, address: address, country: country });
        setSuggestions([]);
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={user_data.address}
                onChange={handleChange}
                placeholder="Enter address..."
                className="border rounded mb-2 w-full px-2 py-1 text-sm
                    bg-white dark:bg-[#1E293B]
                    text-slate-900 dark:text-slate-100
                    border-[#FF833C] dark:border-[#FF833C]
                    placeholder:text-slate-400 dark:placeholder:text-slate-500
                    focus:outline-none focus:ring-1 focus:ring-[#FF833C]
                    transition-colors duration-200"
                required
            />
            {suggestions.length > 0 && (
                <ul className="mt-1 border rounded-lg shadow-lg z-50 absolute w-full
                    bg-white dark:bg-[#1E293B]
                    border-slate-200 dark:border-slate-600">
                    {suggestions.map((item: any, index: number) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer text-sm
                                text-slate-800 dark:text-slate-200
                                hover:bg-slate-100 dark:hover:bg-slate-700
                                transition-colors duration-150"
                            onClick={() => handleSelect(item.address?.label ?? '')}
                        >
                            {item.address?.label ?? ''}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-4 flex flex-col gap-4
            bg-white dark:bg-[#0F172A]
            text-slate-900 dark:text-slate-100
            rounded-lg shadow-md dark:shadow-none mt-4
            border border-transparent dark:border-slate-700
            transition-colors duration-200">
            {children}
        </div>
    );
}

const inputClass = `
    border rounded px-2 py-1 text-sm w-full mb-2
    bg-white dark:bg-[#1E293B]
    text-slate-900 dark:text-slate-100
    border-[#FF833C] dark:border-[#FF833C]
    placeholder:text-slate-400 dark:placeholder:text-slate-500
    focus:outline-none focus:ring-1 focus:ring-[#FF833C]
    transition-colors duration-200
`;

const statusBadge = (status: string) => {
    const base = "text-[0.6rem] font-bold rounded-full px-2 py-1 border";
    switch (status) {
        case 'pending':
            return `${base} bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 border-[#FF833C]`;
        case 'assigned':
        case 'in transit':
            return `${base} bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 border-[#FF833C]`;
        case 'returned':
        case 'canceled':
            return `${base} bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-500`;
        default:
            return `${base} bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-400`;
    }
};

export default function TrackingDetails() {
    const location = useLocation()?.state?.state?.state;
    const params = useParams();
    const parcel_number = params.trackingID || location.parcel_number;

    const [trackingData, setTrackingData] = useState({
        customer_email: "",
        customer_phone: "",
        shipping_address: "",
        country: "",
        product_name: "",
        parcel_number: parcel_number,
        status: "",
        rider_name: "",
        rider_phone: ""
    });

    const [trackingStatus, setTrackingStatus] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [rider, setRider] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [edit, setEdit] = useState(false);
    const [user_data, setUserData] = useState({
        email: trackingData.customer_email,
        phone: trackingData.customer_phone,
        address: trackingData.shipping_address,
        country: trackingData.country,
        product_name: trackingData.product_name
    });

    useEffect(() => {
        axiosInstance.get(`/trackings/${trackingData.parcel_number}/`).then((response: any) => {
            setTrackingData({ ...trackingData, ...response.data });
            setUserData({
                email: response.data.customer_email,
                phone: response.data.customer_phone,
                address: response.data.shipping_address,
                country: response.data.country,
                product_name: response.data.product_name
            });
            setTrackingStatus(response.data.status);
        }).catch((error: any) => {
            alert('Oops! Something went wrong while loading details. Please try again.');
            console.error('There was an error!', error);
        });
    }, []);

    const productName = user_data.product_name.split(',');

    const handleAssignClick = () => setIsDialogOpen(true);
    const handleOffDialog = () => setIsDialogOpen(false);

    const handleShippingUpdate = async () => {
        const unchanged =
            trackingData.customer_email.toLowerCase() === user_data.email.toLowerCase() &&
            trackingData.customer_phone === user_data.phone &&
            trackingData.shipping_address.toLowerCase() === user_data.address.toLowerCase() &&
            trackingData.country.toLowerCase() === user_data.country.toLowerCase() &&
            trackingData.product_name.toLowerCase() === user_data.product_name.toLowerCase();

        if (unchanged) {
            setEdit(false);
            setTimeout(() => { setShowMessage(true); setTimeout(() => setShowMessage(false), 3000); }, 200);
            return;
        }

        await axiosInstance.patch(`/tracking/${trackingData.parcel_number}/`, {
            customer_email: user_data.email.toLowerCase(),
            customer_phone: user_data.phone.toLowerCase(),
            shipping_address: user_data.address.toLowerCase(),
            country: user_data.country.toLowerCase(),
            product_name: user_data.product_name.toLowerCase()
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
        }).then(() => {
            setEdit(false);
            setTimeout(() => { setShowMessage(true); setTimeout(() => setShowMessage(false), 3000); }, 200);
        }).catch((error) => {
            alert('Unable to update shipping details. Please try again.');
            console.error('There was an error!', error.msg);
        });
    };

    return (
        <div className="p-4 min-h-screen bg-slate-50 dark:bg-[#0B1120] transition-colors duration-300">

            {/* Header */}
            <Container>
                <section className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold mb-0 text-slate-900 dark:text-slate-100">
                            Tracking Details
                        </h1>
                        <p className="ml-5 text-slate-500 dark:text-slate-400 text-sm">
                            Manage tracking assignment and delivery status
                        </p>
                    </div>

                    {trackingStatus !== "" && trackingStatus === 'pending' && (
                        <div className="flex gap-2">
                            {!edit && (
                                <button
                                    onClick={() => setEdit(true)}
                                    className="mt-2 bg-[#FF833C] text-white text-sm px-4 py-2 rounded-xl
                                        border-2 border-[#FF833C]
                                        hover:bg-[#e6722e] hover:border-[#e6722e]
                                        dark:hover:bg-[#ff9a5c] dark:hover:border-[#ff9a5c]
                                        dark:shadow-[0_0_12px_rgba(255,131,60,0.3)]
                                        transition-all duration-200 shadow-sm font-medium"
                                >
                                    Edit
                                </button>
                            )}
                            {edit && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEdit(false)}
                                        className="mt-2 bg-transparent text-slate-600 dark:text-slate-300 text-sm px-4 py-2 rounded-xl
                                            border-2 border-slate-300 dark:border-slate-600
                                            hover:bg-slate-100 dark:hover:bg-slate-700
                                            transition-all duration-200 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleShippingUpdate}
                                        className="mt-2 bg-[#FF833C] text-white text-sm px-4 py-2 rounded-xl
                                            border-2 border-[#FF833C]
                                            hover:bg-[#e6722e] hover:border-[#e6722e]
                                            dark:hover:bg-[#ff9a5c] dark:hover:border-[#ff9a5c]
                                            dark:shadow-[0_0_12px_rgba(255,131,60,0.3)]
                                            transition-all duration-200 shadow-sm font-medium"
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </Container>

            {/* Customer + Package Details */}
            <Container>
                <section>
                    <div className="flex gap-4">
                        {/* Left: Customer */}
                        <div className="w-1/2">
                            <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                                {trackingData.parcel_number}
                            </h2>
                            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">Customer</p>

                            <div className="flex gap-2 mb-1">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="text-slate-500 dark:text-slate-400"
                                    style={{ fontSize: "0.8rem", marginTop: "3px" }}
                                />
                                {edit && trackingStatus === 'pending' ? (
                                    <div className="flex flex-col w-full gap-1">
                                        <div>
                                            <label htmlFor="email" className="text-xs text-slate-600 dark:text-slate-400 mb-1 block">
                                                Email:
                                            </label>
                                            <input
                                                type="text"
                                                id="email"
                                                className={inputClass}
                                                placeholder="johndoe@example.com"
                                                value={user_data.email}
                                                onChange={(e) => setUserData({ ...user_data, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="text-xs text-slate-600 dark:text-slate-400 mb-1 block">
                                                Phone Number:
                                            </label>
                                            <input
                                                type="text"
                                                id="phone"
                                                className={inputClass}
                                                placeholder="0244567890"
                                                maxLength={10}
                                                value={user_data.phone}
                                                onChange={(e) => setUserData({ ...user_data, phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="mb-1 text-slate-800 dark:text-slate-200">{user_data.email}</p>
                                        <p className="mb-4 text-slate-600 dark:text-slate-400">
                                            {trackingData.country === "Nigeria"
                                                ? user_data.phone && `+234${user_data.phone}`
                                                : user_data.phone && `+233${user_data.phone}`
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Status + Package */}
                        <div className="w-1/2 p-6">
                            {trackingStatus !== "" && (
                                <div className="flex justify-end mb-4">
                                    <span className={statusBadge(trackingStatus)}>
                                        {trackingStatus === 'pending'
                                            ? 'Pending Assignment'
                                            : trackingStatus.charAt(0).toUpperCase() + trackingStatus.slice(1)
                                        }
                                    </span>
                                </div>
                            )}

                            <div>
                                <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Package Details</p>
                                {edit && trackingStatus === 'pending' ? (
                                    <div>
                                        <label htmlFor="product_name" className="text-xs text-slate-600 dark:text-slate-400 mb-1 block">
                                            Product Name:
                                        </label>
                                        <input
                                            type="text"
                                            id="product_name"
                                            className={inputClass}
                                            placeholder="Electronics, Clothes"
                                            value={user_data.product_name}
                                            onChange={(e) => setUserData({ ...user_data, product_name: e.target.value })}
                                            required
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                                        <Package className="h-4 w-4 text-[#FF833C]" />
                                        {productName.length > 1
                                            ? `${productName[0].charAt(0).toUpperCase() + productName[0].slice(1).toLowerCase().trim()} - ${productName[1].charAt(1).toUpperCase() + productName[1].slice(2).toLowerCase()}...`
                                            : `${productName[0].charAt(0).toUpperCase() + productName[0].slice(1)}`
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Container>

            {/* Delivery Address */}
            <Container>
                <section>
                    <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-slate-900 dark:text-slate-100">
                        <MapPin className="text-[#FF833C]" /> Delivery Address
                    </h2>

                    {edit && trackingStatus === 'pending' ? (
                        <div className="flex w-full gap-4">
                            <div className="w-1/2 flex flex-col relative">
                                <label htmlFor="address" className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                    Address:
                                </label>
                                <AddressAutocomplete user_data={user_data} setUserData={setUserData} />
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <label htmlFor="country" className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                    Country:
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    className={inputClass}
                                    placeholder="e.g. Ghana"
                                    value={user_data.country}
                                    onChange={(e) => setUserData({ ...user_data, country: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="mb-1 ml-5 text-slate-700 dark:text-slate-300">{user_data.address}</p>
                            <p className="mb-1 ml-5 text-slate-500 dark:text-slate-400">{user_data.country}</p>
                        </>
                    )}
                </section>
            </Container>

            {/* Rider Assignment */}
            {!edit && (
                <>
                    <Container>
                        <section>
                            <h2 className="text-xl font-bold mb-2 flex gap-2 items-center text-slate-900 dark:text-slate-100">
                                <Truck className="text-[#FF833C]" /> Rider Assignment
                            </h2>

                            {isDialogOpen && (
                                <Dialog
                                    parcel_number={trackingData.parcel_number}
                                    handleOffDialog={handleOffDialog}
                                    handleSetTrackingStatus={setTrackingStatus}
                                    handleSetRider={setRider}
                                />
                            )}

                            {trackingStatus === 'pending' && (
                                <>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                                        Assign this delivery to an available rider below
                                    </p>
                                    <button
                                        onClick={handleAssignClick}
                                        className="mt-4 w-full bg-[#FF833C] text-white px-4 py-2 rounded-lg
                                            hover:bg-[#e6722e] dark:hover:bg-[#ff9a5c]
                                            dark:shadow-[0_0_12px_rgba(255,131,60,0.3)]
                                            transition-all duration-200
                                            flex items-center justify-center gap-2
                                            shadow-sm text-sm font-medium"
                                    >
                                        <User className="h-4 w-4" /> Assign Rider
                                    </button>
                                </>
                            )}

                            {trackingStatus !== 'pending' && trackingStatus !== "" && trackingStatus !== "canceled" && (
                                <div className="w-full">
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                                        Delivery has been assigned
                                    </p>
                                    <div className="w-full h-[5rem] flex justify-center items-center">
                                        <CheckCircle size={80} className="text-green-500 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-center font-medium mt-2 text-slate-800 dark:text-slate-200">
                                        Assignee: {
                                            trackingData.rider_name && trackingData.rider_phone
                                                ? `🏍️ ${title(trackingData.rider_name)} - ${trackingData.rider_phone}`
                                                : rider
                                        }
                                    </h3>
                                </div>
                            )}

                            {trackingStatus === 'canceled' && (
                                <p className="text-sm text-red-500 dark:text-red-400 mt-2">
                                    This delivery has been canceled.
                                </p>
                            )}
                        </section>
                    </Container>

                    <MessageBox
                        message="Updated successfully ✅"
                        showMessage={showMessage}
                        state="success"
                        marginX="5rem"
                        size="12px"
                    />
                </>
            )}
        </div>
    );
}