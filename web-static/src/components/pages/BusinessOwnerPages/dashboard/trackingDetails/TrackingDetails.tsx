import { useLocation, useParams } from "react-router-dom";
import { User, MapPin, CheckCircle, Package, Truck, Mail, Phone } from 'lucide-react';
import { useEffect, useState } from "react";
import Dialog from "@components/common/reusable/dialog";
import axiosInstance from "@api/axiosInstance";
import React from "react";
import MessageBox from "@components/common/reusable/messageBox";
import title from "@components/utils/title";
import { useAuth } from "../../../../../context/AuthContext";
import {v4 as uuidv4} from 'uuid'


export function AddressAutocomplete({ user_data, setUserData, setOptionClicked }: { user_data: any; setUserData: (u: any) => void; setOptionClicked: (x: boolean) => void;}) {
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [query, setQuery] = useState<string>('');


    useEffect(() => {
    // don't query for tiny input
    if (!query || query.length < 5) { 
        setSuggestions([]); 
        return; 
    }


    const timeout = setTimeout(() => {
      fetchSuggestions(query);
      setQuery(''); // clear query to prevent repeated calls for the same input
    }, 500); // 500ms debounce

    // cleanup previous timer
    return () => clearTimeout(timeout);
    }, [query]);

    const fetchSuggestions = async (value: any) => {

        setOptionClicked(false);
        const sessionToken = uuidv4()
        
        
        try {
            const BASE_URL = import.meta.env.VITE_TRACKERR_HOST
            const url = `${BASE_URL}/map/autocomplete?q=${value}&sessionToken=${sessionToken}`;
            const response = await axiosInstance.get(url);
            const data = await response.data;
    
            setSuggestions(data || []);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserData({ ...user_data, address: value });
        setQuery(value);
        // fetchSuggestions(value);
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
                className="border rounded-lg w-full px-3 py-2.5 text-sm
                    bg-white dark:bg-[#1E293B]
                    text-slate-900 dark:text-slate-100
                    border-slate-300 dark:border-slate-600
                    placeholder:text-slate-400 dark:placeholder:text-slate-500
                    focus:outline-none focus:ring-2 focus:ring-[#FF833C]/40 focus:border-[#FF833C]
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
                            onClick={() => {
                                handleSelect(item.address?.label ?? ''); 
                                setOptionClicked(true)
                            }}
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
        <div className="p-5 flex flex-col gap-4
            bg-white dark:bg-[#0F172A]
            text-slate-900 dark:text-slate-100
            rounded-xl shadow-sm dark:shadow-none mt-4
            border border-slate-100 dark:border-slate-700
            transition-colors duration-200">
            {children}
        </div>
    );
}

const inputClass = `
    border rounded-lg px-3 py-2.5 text-sm w-full
    bg-white dark:bg-[#1E293B]
    text-slate-900 dark:text-slate-100
    border-slate-300 dark:border-slate-600
    placeholder:text-slate-400 dark:placeholder:text-slate-500
    text-left
    placeholder:text-left dark:placeholder:text-left
    focus:outline-none focus:ring-2 focus:ring-[#FF833C]/40 focus:border-[#FF833C]
    transition-colors duration-200
`;

const labelClass = "block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide";

const statusBadge = (status: string) => {
    const base = "text-[0.65rem] font-bold rounded-full px-3 py-1 border";
    switch (status) {
        case 'pending':
            return `${base} bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700`;
        case 'assigned':
        case 'in transit':
            return `${base} bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700`;
        case 'returned':
        case 'canceled':
            return `${base} bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700`;
        default:
            return `${base} bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-400`;
    }
};

export default function TrackingDetails() {
    const location = useLocation()?.state?.state?.state;
    const params = useParams();
    const parcel_number = params.trackingID || location.parcel_number;

    const { user } = useAuth();

    const country: string = user?.user?.country || '';

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
    const [optionClicked, setOptionClicked] = useState(true)
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
            // headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
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

            {/* ── Header ── */}
            <Container>
                <section className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            Tracking Details
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                            Manage tracking assignment and delivery status
                        </p>
                    </div>

                    {trackingStatus === 'pending' && (
                        <div className="flex gap-2">
                            {!edit ? (
                                <button
                                    onClick={() => setEdit(true)}
                                    className="bg-[#FF833C] text-white text-sm px-5 py-2 rounded-lg
                                        hover:bg-[#e6722e] dark:hover:bg-[#ff9a5c]
                                        dark:shadow-[0_0_12px_rgba(255,131,60,0.3)]
                                        transition-all duration-200 font-medium"
                                >
                                    Edit
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setEdit(false)}
                                        className="text-slate-600 dark:text-slate-300 text-sm px-5 py-2 rounded-lg
                                            border border-slate-300 dark:border-slate-600
                                            hover:bg-slate-100 dark:hover:bg-slate-700
                                            transition-all duration-200 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    {
                                        optionClicked && (
                                            <button
                                            onClick={handleShippingUpdate}
                                            className="bg-[#FF833C] text-white text-sm px-5 py-2 rounded-lg
                                            hover:bg-[#e6722e] dark:hover:bg-[#ff9a5c]
                                            dark:shadow-[0_0_12px_rgba(255,131,60,0.3)]
                                            transition-all duration-200 font-medium"
                                        >
                                            Save Changes
                                        </button>
                                        )
                                    }
                                    
                                </>
                            )}
                        </div>
                    )}
                </section>
            </Container>

            {/* ── Customer + Package Details ── */}
            <Container>
                {/* Parcel number + status row */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-0.5">
                            Parcel Number
                        </p>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                            {trackingData.parcel_number}
                        </h2>
                    </div>
                    {trackingStatus && (
                        <span className={statusBadge(trackingStatus)}>
                            {trackingStatus === 'pending'
                                ? 'Pending Assignment'
                                : trackingStatus.charAt(0).toUpperCase() + trackingStatus.slice(1)
                            }
                        </span>
                    )}
                </div>

                {/* Edit mode: full-width stacked fields */}
                {edit && trackingStatus === 'pending' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className={labelClass}>Email</label>
                            <input
                                type="email"
                                id="email"
                                className={inputClass}
                                placeholder="johndoe@example.com"
                                value={user_data.email}
                                onChange={(e) => setUserData({ ...user_data, email: e.target.value })}
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className={labelClass}>Phone Number</label>
                            <input
                                type="text"
                                id="phone"
                                className={inputClass}
                                placeholder="07037676797"
                                maxLength={11}
                                value={user_data.phone}
                                onChange={(e) => setUserData({ ...user_data, phone: e.target.value })}
                                required
                            />
                        </div>

                        {/* Product Name — full width */}
                        <div className="sm:col-span-2">
                            <label htmlFor="product_name" className={labelClass}>Product Name</label>
                            <input
                                type="text"
                                id="product_name"
                                className={`${inputClass}`}
                                placeholder="Electronics, Clothes"
                                value={user_data.product_name}
                                onChange={(e) => setUserData({ ...user_data, product_name: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                ) : (
                    /* View mode: clean info cards */
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                        {/* Email */}
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <div className="mt-0.5 p-1.5 rounded-md bg-orange-100 dark:bg-orange-900/30">
                                <Mail className="h-3.5 w-3.5 text-[#FF833C]" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-0.5">
                                    Email
                                </p>
                                <p className="text-sm text-slate-800 dark:text-slate-200 truncate">
                                    {user_data.email || '—'}
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <div className="mt-0.5 p-1.5 rounded-md bg-orange-100 dark:bg-orange-900/30">
                                <Phone className="h-3.5 w-3.5 text-[#FF833C]" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-0.5">
                                    Phone
                                </p>
                                <p className="text-sm text-slate-800 dark:text-slate-200">
                                    {user_data.phone
                                        ? `${trackingData.country === "Nigeria" ? "+234" : "+233"}${user_data.phone}`
                                        : '—'}
                                </p>
                            </div>
                        </div>

                        {/* Package */}
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <div className="mt-0.5 p-1.5 rounded-md bg-orange-100 dark:bg-orange-900/30">
                                <Package className="h-3.5 w-3.5 text-[#FF833C]" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-0.5">
                                    Package
                                </p>
                                <p className="text-sm text-slate-800 dark:text-slate-200 truncate">
                                    {productName.length > 1
                                        ? `${productName[0].trim()} +${productName.length - 1} more`
                                        : productName[0]
                                            ? productName[0].charAt(0).toUpperCase() + productName[0].slice(1)
                                            : '—'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Container>

            {/* ── Delivery Address ── */}
            <Container>
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
                    <div className="p-1.5 rounded-md bg-orange-100 dark:bg-orange-900/30">
                        <MapPin className="h-4 w-4 text-[#FF833C]" />
                    </div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        Delivery Address
                    </h2>
                </div>

                {edit && trackingStatus === 'pending' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <label htmlFor="address" className={labelClass}>Address</label>
                            <AddressAutocomplete user_data={user_data} setUserData={setUserData} setOptionClicked={setOptionClicked}/>
                        </div>
                        <div className="">
                            <label htmlFor="country" className={labelClass}>Country</label>
                            <p className={inputClass + "cursor-not-allowed bg-slate-200 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400"}>
                                {title(country)}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
                                Address
                            </p>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                {user_data.address || '—'}
                            </p>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
                                Country
                            </p>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                {user_data.country || '—'}
                            </p>
                        </div>
                    </div>
                )}
            </Container>

            {/* ── Rider Assignment ── */}
            {!edit && (
                <>
                    <Container>
                        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
                            <div className="p-1.5 rounded-md bg-orange-100 dark:bg-orange-900/30">
                                <Truck className="h-4 w-4 text-[#FF833C]" />
                            </div>
                            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                                Rider Assignment
                            </h2>
                        </div>

                        {isDialogOpen && (
                            <Dialog
                                parcel_number={trackingData.parcel_number}
                                handleOffDialog={handleOffDialog}
                                handleSetTrackingStatus={setTrackingStatus}
                                handleSetRider={setRider}
                            />
                        )}

                        {trackingStatus === 'pending' && (
                            <div className="flex flex-col items-center gap-3 py-2">
                                <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
                                    Assign this delivery to an available rider below
                                </p>
                                <button
                                    onClick={handleAssignClick}
                                    className="w-full sm:w-auto px-8 py-2.5 bg-[#FF833C] text-white rounded-lg
                                        hover:bg-[#e6722e] dark:hover:bg-[#ff9a5c]
                                        dark:shadow-[0_0_12px_rgba(255,131,60,0.3)]
                                        transition-all duration-200
                                        flex items-center justify-center gap-2
                                        text-sm font-medium"
                                >
                                    <User className="h-4 w-4" /> Assign Rider
                                </button>
                            </div>
                        )}

                        {trackingStatus !== 'pending' && trackingStatus !== "" && trackingStatus !== "canceled" && (
                            <div className="flex flex-col items-center gap-2 py-4">
                                <CheckCircle size={56} className="text-green-500 dark:text-green-400" />
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Delivery has been assigned
                                </p>
                                <div className="mt-1 px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-center">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-0.5">
                                        Assignee
                                    </p>
                                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        {trackingData.rider_name && trackingData.rider_phone
                                            ? `🏍️ ${title(trackingData.rider_name)} — ${trackingData.rider_phone}`
                                            : rider
                                        }
                                    </h3>
                                </div>
                            </div>
                        )}

                        {trackingStatus === 'canceled' && (
                            <p className="text-sm text-red-500 dark:text-red-400 text-center py-2">
                                This delivery has been canceled.
                            </p>
                        )}
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