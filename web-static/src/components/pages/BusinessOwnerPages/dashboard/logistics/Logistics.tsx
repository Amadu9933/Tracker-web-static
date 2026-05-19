import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowLeft, Trash2, Edit, Eye, MapPin, Phone, Plus, Package } from "lucide-react";
import { Container } from "../trackingDetails/TrackingDetails";
import { DeleteDialog, ReusableDialog } from "@components/common/reusable/dialog";
import { useEffect, useState } from "react";
import axiosInstance from "@api/axiosInstance";
import MessageBox from "@components/common/reusable/messageBox";
import title from "@components/utils/title";
import { motion } from "framer-motion";
import {useAuth} from '../../../../../context/AuthContext';
import rating, { average_riders_rating } from "@components/utils/calc_rating";

const Integration = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [showViewDialog, setShowViewDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [selectedRider, setSelectedRider] = useState<any | null>(null);
    const [editRiderInfo, setEditRiderInfo] = useState({ name: '', address: '', phone: '', email: '', idType: '', idNumber: '' });
    const [msg, setMsg] = useState('');
    const [payuMsg, setPayuMsg] = useState('');
    const {user} = useAuth();
    const [riders, setRiders] = useState<any[]>([]);

    const average = average_riders_rating(riders);

    const [riderInfo, setRiderInfo] = useState({
        name: '', address: '', phone: '', email: '', idType: '', idNumber: ''
    });
    const [riderToDelete, setRiderToDelete] = useState({ id: null, name: '' });
    const [showRiderDeleteDialog, setShowRiderDeleteDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;

    const inputClass =
        'w-full p-2.5 border rounded-lg text-sm transition-colors duration-200 ' +
        'bg-white dark:bg-[#1e2738] ' +
        'text-gray-900 dark:text-gray-100 ' +
        'border-gray-300 dark:border-gray-600 ' +
        'placeholder:text-gray-400 dark:placeholder:text-gray-500 ' +
        'focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400 ' +
        'dark:focus:border-orange-400 dark:focus:ring-orange-400/30';

    const labelClass = 'block text-xs sm:text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300';

    const filteredRiders = searchTerm.trim() === ''
        ? riders
        : riders.filter(rider => rider.user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        document.title = "Logistics - Tracker";
        axiosInstance.get(`${TRACKERR_HOST}/logistics/business-owners/riders/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
        }).then((response) => {
            setRiders(response?.data?.msg || []);
        }).catch((error) => {
            console.error('Error fetching riders:', error);
        });
    }, [msg]);

    const createRider = (data: any) => {
        axiosInstance.post(`${TRACKERR_HOST}/logistics/signup/`, { ...data, account_type: "logistics" }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access')}`, "Content-Type": "application/json" }
        }).then(() => {
            setMsg('Rider created successfully');
            setTimeout(() => setMsg('Check email for login details'), 3000);
            setTimeout(() => setMsg(''), 6000);
        }).catch((error) => {
            const errMsg = error?.response?.data?.msg;
            const errorMapping: any = {
                email: 'Email already exists',
                phone_number: 'Phone number already exists',
                id_number: 'ID number already exists'
            };
            let foundMessage = '';
            for (const key of Object.keys(errorMapping)) {
                if (errMsg?.[key]?.[0]) { foundMessage = errorMapping[key]; break; }
            }
            setMsg(foundMessage || 'Failed to create rider');
            setTimeout(() => setMsg(''), 3000);
        });
    };

    const handleRiderDeleteConfirmation = (id: any, name: string) => {
        setRiderToDelete({ id, name });
        setShowRiderDeleteDialog(true);
    };

    const handleRiderDelete = () => {
        axiosInstance.delete(`${TRACKERR_HOST}/logistics/riders/${riderToDelete.id}/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
        }).then(() => {
            setMsg('Rider deleted successfully');
            setShowRiderDeleteDialog(false);
            setTimeout(() => { setMsg(''); }, 3000);
        }).catch((error) => {
            console.error('Error deleting rider:', error);
            setMsg('Failed to delete rider');
            setShowRiderDeleteDialog(false);
            setTimeout(() => setMsg(''), 3000);
        });
    };


    // Checks if the vendor is a payu user
    const vendorIsPayu = () => {
        if (user?.subscription_type === 'payu' || user?.subscription_type === 'trial' && riders.length == 5) {
            // shows dialog if the vendor is a payu or trial user and has 5 riders already
            setPayuMsg('⚠️ You need to be a Premium subscriber to add more riders. Please upgrade your subscription to access this feature.');
            setTimeout(() => setPayuMsg(''), 7000);
            return;
        }
        setShowDialog(true);
    };

    const handleAddRider = () => {
        if (Object.values(riderInfo).some(v => v === '')) {
            alert('Please fill in all the required fields to add a rider.'); return;
        }
        createRider({
            name: riderInfo.name,
            address: riderInfo.address,
            phone_number: riderInfo.phone,
            email: riderInfo.email,
            identity_card_type: riderInfo.idType,
            id_number: riderInfo.idNumber
        });
        setRiderInfo({ name: '', address: '', phone: '', email: '', idType: '', idNumber: '' });
        setShowDialog(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setRiderInfo(prev => ({ ...prev, [id]: value }));
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setEditRiderInfo(prev => ({ ...prev, [id]: value }));
    };

    const handleViewRider = (rider: any) => {
        setSelectedRider(rider);
        setShowViewDialog(true);
    };

    const handleEditRider = (rider: any) => {
        setSelectedRider(rider);
        setEditRiderInfo({
            name: rider.user.name || '',
            address: rider.user.address || '',
            phone: rider.user.phone_number || '',
            email: rider.user.email || '',
            idType: rider.identity_card_type || '',
            idNumber: rider.id_number || ''
        });
        setShowEditDialog(true);
    };

    const handleUpdateRider = () => {
        if (!selectedRider) return;

        axiosInstance.patch(`${TRACKERR_HOST}/logistics/riders/${selectedRider.id}/`, {
            name: editRiderInfo.name,
            address: editRiderInfo.address,
            phone_number: editRiderInfo.phone,
            email: editRiderInfo.email,
            identity_card_type: editRiderInfo.idType,
            id_number: editRiderInfo.idNumber
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access')}`, "Content-Type": "application/json" }
        }).then(() => {
            setMsg('Rider updated successfully');
            setShowEditDialog(false);
            setSelectedRider(null);
            setTimeout(() => setMsg(''), 3000);
        }).catch((error) => {
            console.error('Error updating rider:', error);
            setMsg('Failed to update rider');
            setTimeout(() => setMsg(''), 3000);
        });
    };

    const statCards = [
        {
            label: 'Total Riders',
            value: riders.length,
            icon: <FontAwesomeIcon icon={faUser} style={{ fontSize: '0.8rem' }} />,
            color: 'text-gray-700 dark:text-gray-200'
        },
        {
            label: 'Active Riders',
            value: riders.filter(r => r.status.toLowerCase() === 'active').length,
            icon: <div className="rounded-full h-2 w-2 bg-green-500" />,
            color: 'text-green-500'
        },
        {
            label: 'Busy Riders',
            value: riders.filter(r => r?.is_busy === true).length,
            icon: <Package className="h-4 w-4 text-orange-500" />,
            color: 'text-orange-400'
        },
        {
            label: 'Average Rating',
            value: isNaN(parseFloat(average)) ? '0.0' : average,
            icon: <span>⭐</span>,
            color: 'text-gray-800 dark:text-gray-100'
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b111f] transition-colors duration-300 pb-10">

            {/* ── Header ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex bg-white dark:bg-[#111827] p-4 rounded-xl
                    shadow-sm dark:shadow-none
                    border border-transparent dark:border-gray-700
                    mb-4 items-center transition-colors duration-200"
            >
                <ArrowLeft className="w-5 h-5 cursor-pointer flex-shrink-0 text-gray-600 dark:text-gray-300" />
                <div className="ml-3">
                    <h6 className="font-bold text-lg sm:text-2xl font-sans mb-0.5 text-gray-900 dark:text-gray-100">
                        Manage Riders
                    </h6>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Add, edit, and monitor your delivery riders
                    </p>
                </div>
            </motion.div>

            {/* ── Stat Cards ── */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 px-2 sm:px-0 mb-4"
            >
                {statCards.map(({ label, value, icon, color }, i) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                        className="border dark:border-gray-700 h-24 rounded-xl shadow-sm
                            bg-white dark:bg-[#111827]
                            transition-colors duration-200"
                    >
                        <div className="flex flex-col justify-between h-full p-4 gap-2">
                            <div className="flex w-full justify-between items-center">
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{label}</p>
                                <span className="text-gray-400 dark:text-gray-500">{icon}</span>
                            </div>
                            <h4 className={`font-bold text-xl sm:text-2xl ${color}`}>{value}</h4>
                        </div>
                    </motion.div>
                ))}
            </motion.section>

            {/* Message Box for Payu Alert */}
            {payuMsg && (
                <ReusableDialog>
                    <h3 className="font-medium text-sm text-center text-red-600 dark:text-red-300">
                        {payuMsg}
                    </h3>
                </ReusableDialog>
            ) }

            {/* ── Add Rider Dialog ── */}
            {showDialog && (
                <ReusableDialog>
                    <div className="flex justify-between w-full mb-4">
                        <div>
                            <h2 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100">
                                Add New Rider
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                Add a new rider to your delivery team
                            </p>
                        </div>
                        <button
                            className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-lg leading-none cursor-pointer"
                            onClick={() => setShowDialog(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <form className="w-full mt-2 space-y-4">
                        {/* Two-column grid for name + email, address + phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { id: 'name', label: 'Rider Name', placeholder: 'e.g. John Doe' },
                                { id: 'email', label: 'Email Address', placeholder: 'e.g. johndoe@example.com' },
                                { id: 'address', label: 'Address', placeholder: 'e.g. 36 Accra Avenue' },
                                { id: 'phone', label: 'Phone Number', placeholder: 'e.g. 0244567890' },
                            ].map(({ id, label, placeholder }) => (
                                <div key={id}>
                                    <label className={labelClass} htmlFor={id}>{label}</label>
                                    <input
                                        className={inputClass}
                                        type="text"
                                        id={id}
                                        placeholder={placeholder}
                                        aria-label={label}
                                        onChange={handleInputChange}
                                        value={riderInfo[id as keyof typeof riderInfo]}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* ID Type + ID Number */}
                        <div className="flex gap-3">
                            <div className="flex-1 ">
                                <label className={labelClass} htmlFor="idType">ID Type</label>
                                <select
                                    className={`${inputClass} h-[48px]`}
                                    id="idType"
                                    aria-label="ID Type"
                                    onChange={handleInputChange}
                                    value={riderInfo.idType}
                                >
                                    <option value="select" className="dark:bg-[#1e2738]">Select ID Type</option>
                                    <option value="driver's license" className="dark:bg-[#1e2738]">Driver's License</option>
                                    <option value="national id" className="dark:bg-[#1e2738]">National ID</option>
                                    <option value="voter's card" className="dark:bg-[#1e2738]">Voter's Card</option>
                                    <option value="passport" className="dark:bg-[#1e2738]">Passport</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className={labelClass} htmlFor="idNumber">ID Number</label>
                                <input
                                    className={inputClass}
                                    type="text"
                                    id="idNumber"
                                    placeholder="e.g. GHA-123456789"
                                    aria-label="ID Number"
                                    onChange={handleInputChange}
                                    value={riderInfo.idNumber}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={() => setShowDialog(false)}
                                className="px-5 py-2 text-sm font-medium rounded-lg
                                    bg-gray-100 dark:bg-gray-700
                                    text-gray-700 dark:text-gray-200
                                    hover:bg-gray-200 dark:hover:bg-gray-600
                                    transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleAddRider}
                                className="px-5 py-2 text-sm font-medium rounded-lg
                                    bg-orange-500 dark:bg-orange-500
                                    text-white
                                    hover:bg-orange-600 dark:hover:bg-orange-400
                                    dark:shadow-[0_0_10px_rgba(249,115,22,0.3)]
                                    transition-all duration-200"
                            >
                                Add Rider
                            </button>
                        </div>
                    </form>
                </ReusableDialog>
            )}

            {/* ── Riders Table Section ── */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <Container>
                    {/* Table header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                        <div>
                            <h6 className="font-bold text-base sm:text-xl font-sans text-gray-900 dark:text-gray-100">
                                Riders List
                            </h6>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                Manage your delivery team
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <input
                                className="w-full sm:w-[200px] md:w-[240px] h-9 px-3 text-sm rounded-lg
                                    border border-gray-300 dark:border-gray-600
                                    bg-white dark:bg-[#1e2738]
                                    text-gray-900 dark:text-gray-100
                                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                                    focus:outline-none focus:ring-1 focus:ring-orange-400/40 focus:border-orange-400
                                    dark:focus:border-orange-400 transition-colors duration-200"
                                type="text"
                                placeholder="Search riders..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                className="flex justify-center items-center gap-1.5
                                    bg-orange-500 hover:bg-orange-600
                                    dark:hover:bg-orange-400
                                    dark:shadow-[0_0_10px_rgba(249,115,22,0.25)]
                                    text-white text-sm font-medium px-4 py-2 rounded-lg
                                    whitespace-nowrap h-9 transition-all duration-200"
                                onClick={() => vendorIsPayu()}
                            >
                                <Plus className="w-4 h-4" /> Add Rider
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto border dark:border-gray-700 rounded-xl">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-[#1a2235]">
                                    {['Rider', 'Contact', 'Location', 'Status', 'Performance', 'Actions'].map(h => (
                                        <th
                                            key={h}
                                            className="py-3 px-4 border-b border-gray-200 dark:border-gray-700
                                                text-left text-xs font-semibold
                                                text-gray-500 dark:text-gray-400
                                                uppercase tracking-wide whitespace-nowrap"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-[#111827] divide-y divide-gray-100 dark:divide-gray-700/60">
                                {filteredRiders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">
                                            No riders found.
                                        </td>
                                    </tr>
                                ) : filteredRiders.map((rider) => (
                                    <tr key={rider.id} className="hover:bg-gray-50 dark:hover:bg-[#1e2738] transition-colors duration-150">
                                        {/* Rider */}
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <span className="border p-1.5 rounded-full border-orange-400 flex-shrink-0">
                                                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '0.7rem', color: '#FF833C' }} />
                                                </span>
                                                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                                                    {title(rider.user.name.split(' ')[0])}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Contact */}
                                        <td className="py-3 px-4">
                                            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                                <Phone className="w-3 h-3 flex-shrink-0" />
                                                {rider.user.country === 'nigeria' ? '+234' : '+233'}-{rider?.user?.phone_number}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate max-w-[160px]">
                                                {rider.user.email}
                                            </p>
                                        </td>

                                        {/* Location */}
                                        <td className="py-3 px-4">
                                            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                                <MapPin className="w-3 h-3 flex-shrink-0 text-orange-400" />
                                                {title(rider.user.address)}
                                            </p>
                                        </td>

                                        {/* Status */}
                                        <td className="py-3 px-4">
                                            {rider.status.toLowerCase() === 'busy' ? (
                                                <span className="text-xs border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded-full px-2.5 py-0.5 text-red-500 dark:text-red-400 font-medium">
                                                    {rider.status}
                                                </span>
                                            ) : rider.status.toLowerCase() === 'inactive' ? (
                                                <span className="text-xs border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-full px-2.5 py-0.5 text-gray-500 dark:text-gray-400 font-medium">
                                                    {rider.status}
                                                </span>
                                            ) : (
                                                <span className="text-xs border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 rounded-full px-2.5 py-0.5 text-green-600 dark:text-green-400 font-medium">
                                                    {rider.status}
                                                </span>
                                            )}
                                        </td>

                                        {/* Performance */}
                                        <td className="py-3 px-4">
                                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                                {rider.total_delivery}/{rider.total_assigned_orders} deliveries
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                ⭐ {rating(rider.total_delivery, rider.total_assigned_orders)} rating
                                            </p>
                                        </td>

                                        {/* Actions */}
                                        <td className="py-3 px-4">
                                            <div className="flex gap-1">
                                                <button
                                                    className="p-1.5 rounded border border-transparent
                                                        hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20
                                                        text-gray-500 dark:text-gray-400 hover:text-orange-500
                                                        transition-all duration-150"
                                                    onClick={() => handleViewRider(rider)}
                                                >
                                                    <Eye size={14} />
                                                </button>
                                                <button
                                                    className="p-1.5 rounded border border-transparent
                                                        hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20
                                                        text-gray-500 dark:text-gray-400 hover:text-orange-500
                                                        transition-all duration-150"
                                                    onClick={() => handleEditRider(rider)}
                                                >
                                                    <Edit size={14} />
                                                </button>
                                                <button
                                                    className="p-1.5 rounded border border-transparent
                                                        hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20
                                                        text-red-400 dark:text-red-500
                                                        transition-all duration-150"
                                                    onClick={() => handleRiderDeleteConfirmation(rider.id, rider.user.name)}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ── View Dialog ── */}
                    {showViewDialog && selectedRider && (
                        <ReusableDialog>
                            <div className="flex justify-between w-full mb-4">
                                <div>
                                    <h2 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                                        Rider Details
                                    </h2>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Review rider information for {title(selectedRider.user.name)}
                                    </p>
                                </div>
                                <button
                                    className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-lg leading-none cursor-pointer"
                                    onClick={() => { setShowViewDialog(false); setSelectedRider(null); }}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                                    <p className="text-sm text-gray-900 dark:text-gray-100">{selectedRider.user.name}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                                    <p className="text-sm text-gray-900 dark:text-gray-100">{selectedRider.user.email}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                                    <p className="text-sm text-gray-900 dark:text-gray-100">{selectedRider.user.phone_number}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                                    <p className="text-sm text-gray-900 dark:text-gray-100">{selectedRider.user.address}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">ID Type</p>
                                    <p className="text-sm text-gray-900 dark:text-gray-100">{selectedRider.identity_card_type || 'N/A'}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">ID Number</p>
                                    <p className="text-sm text-gray-900 dark:text-gray-100">{selectedRider.id_number || 'N/A'}</p>
                                </div>
                            </div>
                        </ReusableDialog>
                    )}

                    {showEditDialog && selectedRider && (
                        <ReusableDialog>
                            <div className="flex justify-between w-full mb-4">
                                <div>
                                    <h2 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                                        Edit Rider
                                    </h2>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Update rider details for {title(selectedRider.user.name)}
                                    </p>
                                </div>
                                <button
                                    className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-lg leading-none cursor-pointer"
                                    onClick={() => { setShowEditDialog(false); setSelectedRider(null); }}
                                >
                                    ✕
                                </button>
                            </div>
                            <form className="w-full mt-2 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass} htmlFor="name">Rider Name</label>
                                        <input
                                            className={inputClass}
                                            type="text"
                                            id="name"
                                            value={editRiderInfo.name}
                                            onChange={handleEditInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass} htmlFor="email">Email Address</label>
                                        <input
                                            className={inputClass}
                                            type="email"
                                            id="email"
                                            value={editRiderInfo.email}
                                            onChange={handleEditInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass} htmlFor="address">Address</label>
                                        <input
                                            className={inputClass}
                                            type="text"
                                            id="address"
                                            value={editRiderInfo.address}
                                            onChange={handleEditInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass} htmlFor="phone">Phone Number</label>
                                        <input
                                            className={inputClass}
                                            type="text"
                                            id="phone"
                                            value={editRiderInfo.phone}
                                            onChange={handleEditInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass} htmlFor="idType">ID Type</label>
                                        <select
                                            className={`${inputClass} h-[42px]`}
                                            id="idType"
                                            value={editRiderInfo.idType}
                                            onChange={handleEditInputChange}
                                        >
                                            <option value="">Select ID Type</option>
                                            <option value="driver's license">Driver's License</option>
                                            <option value="national id">National ID</option>
                                            <option value="voter's card">Voter's Card</option>
                                            <option value="passport">Passport</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass} htmlFor="idNumber">ID Number</label>
                                        <input
                                            className={inputClass}
                                            type="text"
                                            id="idNumber"
                                            value={editRiderInfo.idNumber}
                                            onChange={handleEditInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                                    <button
                                        type="button"
                                        onClick={() => { setShowEditDialog(false); setSelectedRider(null); }}
                                        className="px-5 py-2 text-sm font-medium rounded-lg
                                            bg-gray-100 dark:bg-gray-700
                                            text-gray-700 dark:text-gray-200
                                            hover:bg-gray-200 dark:hover:bg-gray-600
                                            transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleUpdateRider}
                                        className="px-5 py-2 text-sm font-medium rounded-lg
                                            bg-orange-500 dark:bg-orange-500
                                            text-white
                                            hover:bg-orange-600 dark:hover:bg-orange-400
                                            transition-all duration-200"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </ReusableDialog>
                    )}

                    {/* ── Delete Dialog ── */}
                    {showRiderDeleteDialog && (
                        <DeleteDialog>
                            <div className="flex justify-between w-full mb-4">
                                <div>
                                    <h2 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                                        Delete Rider
                                    </h2>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Are you sure you want to delete{' '}
                                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                                            {title(riderToDelete.name)}
                                        </span>
                                        ? This action cannot be undone.
                                    </p>
                                </div>
                                <button
                                    className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-lg leading-none cursor-pointer ml-4"
                                    onClick={() => setShowRiderDeleteDialog(false)}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => setShowRiderDeleteDialog(false)}
                                    className="px-5 py-2 text-sm font-medium rounded-lg
                                        bg-gray-100 dark:bg-gray-700
                                        text-gray-700 dark:text-gray-200
                                        hover:bg-gray-200 dark:hover:bg-gray-600
                                        transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRiderDelete}
                                    className="px-5 py-2 text-sm font-medium rounded-lg
                                        bg-red-500 text-white
                                        hover:bg-red-600 dark:hover:bg-red-400
                                        dark:shadow-[0_0_10px_rgba(239,68,68,0.25)]
                                        transition-all duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </DeleteDialog>
                    )}
                </Container>

                <MessageBox
                    message={msg}
                    showMessage={msg !== ''}
                    state={['Rider created successfully', 'Rider deleted successfully', 'Check email for login details'].includes(msg) ? 'success' : 'warning'}
                    size="0.8rem"
                    marginX="1rem"
                />
            </motion.section>
        </div>
    );
};

export default Integration;