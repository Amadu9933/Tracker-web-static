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

const Integration = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [msg, setMsg] = useState('');
    const [riders, setRiders] = useState<any[]>([]);
    const [riderDeleted, setRiderDeleted] = useState(false);

    const validRatings = riders.filter(r => r.rating > 0);
    const average = (validRatings.reduce((sum, r) => sum + r.rating, 0) / validRatings.length).toFixed(1);

    const [riderInfo, setRiderInfo] = useState({
        name: '', address: '', phone: '', email: '', idType: '', idNumber: ''
    });
    const [riderToDelete, setRiderToDelete] = useState({ id: null, name: '' });
    const [showRiderDeleteDialog, setShowRiderDeleteDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;
    

    const inputClass = 'w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 placeholder:text-gray-400';

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
            const errorMapping: any = { email: 'Email already exists', phone_number: 'Phone number already exists', id_number: 'ID number already exists' };
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
            setRiderDeleted(true);
            setShowRiderDeleteDialog(false);
            setTimeout(() => { setMsg(''); setRiderDeleted(false); }, 3000);
        }).catch((error) => {
            console.error('Error deleting rider:', error);
            setMsg('Failed to delete rider');
            setShowRiderDeleteDialog(false);
            setTimeout(() => setMsg(''), 3000);
        });
    };

    const handleAddRider = () =>{
        if (Object.entries(riderInfo).some(([k, v]) => k == '' && v === '')) {
            alert('Please fill all fields'); return;
        }
        createRider({ name: riderInfo.name, address: riderInfo.address, phone_number: riderInfo.phone, email: riderInfo.email, identity_card_type: riderInfo.idType, id_number: riderInfo.idNumber });
        setRiderInfo({ name: '', address: '', phone: '', email: '', idType: '', idNumber: '' });
        setShowDialog(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setRiderInfo(prev => ({ ...prev, [id]: value }));
    };


    const statCards = [
        { label: 'Total Riders', value: riders.length, icon: <FontAwesomeIcon icon={faUser} style={{ fontSize: '0.8rem' }} />, color: 'text-gray-600' },
        { label: 'Active Riders', value: riders.filter(r => r.status.toLowerCase() === 'active').length, icon: <div className="rounded-full h-2 w-2 bg-green-500" />, color: 'text-green-500' },
        { label: 'Busy Riders', value: riders.filter(r => r?.is_busy === true).length, icon: <Package className="h-4 w-4 text-orange-500" />, color: 'text-orange-400' },
        { label: 'Average Rating', value: isNaN(parseFloat(average)) ? '0.0' : average, icon: <span>⭐</span>, color: 'text-gray-800' },
    ];

    return (
        <div className=" ">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex bg-white p-4 rounded-lg shadow-md mb-4 items-center"
            >
                <ArrowLeft className="w-5 h-5 cursor-pointer flex-shrink-0" />
                <div className="ml-3">
                    <h6 className="font-bold text-lg sm:text-2xl font-sans mb-1">Manage Riders</h6>
                    <p className="text-xs sm:text-sm text-gray-500">Add, edit, and monitor your delivery riders</p>
                </div>
            </motion.div>

            {/* Stat cards */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 p-2 sm:p-4"
            >
                {statCards.map(({ label, value, icon, color }, i) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                        className="border h-24 rounded-md shadow-sm bg-white"
                    >
                        <div className="flex flex-col justify-between h-full p-4 gap-2">
                            <div className="flex w-full justify-between items-center">
                                <p className="text-xs sm:text-sm text-gray-600">{label}</p>
                                {icon}
                            </div>
                            <h4 className={`font-bold text-xl sm:text-2xl ${color}`}>{value}</h4>
                        </div>
                    </motion.div>
                ))}
            </motion.section>

            {/* Add Rider Dialog */}
            {showDialog && (
                <ReusableDialog>
                    <div className="flex justify-between w-full mb-2">
                        <div>
                            <h2 className="font-medium text-base sm:text-lg">Add New Rider</h2>
                            <p className="text-xs sm:text-sm text-gray-500">Add a new rider to your delivery team</p>
                        </div>
                        <span className="cursor-pointer text-gray-500 hover:text-gray-800" onClick={() => setShowDialog(false)}>✕</span>
                    </div>
                    <form className="w-full mt-2 space-y-3">
                        {[
                            { id: 'name', label: 'Rider Name', placeholder: 'John Doe' },
                            { id: 'email', label: 'Email Address', placeholder: 'johndoe@example.com' },
                            { id: 'address', label: 'Address', placeholder: '36 Accra Avenue' },
                            { id: 'phone', label: 'Phone Number', placeholder: '7037676797' },
                        ].map(({ id, label, placeholder }) => (
                            <div key={id}>
                                <label className="block text-xs sm:text-sm font-medium mb-1" htmlFor={id}>{label}</label>
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
                        <div className="flex gap-3">
                            <div className="flex-1  ">
                                <label className="block text-xs sm:text-sm font-medium mb-1" htmlFor="idType">ID Type</label>
                                <select
                                    className="w-full p-2 h-12 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    id="idType"
                                    aria-label="ID Type"
                                    onChange={handleInputChange}
                                    value={riderInfo.idType}

                                >
                                    <option value="select">Select ID Type</option>
                                    <option value="driver's license">Driver's License</option>
                                    <option value="national id">National ID</option>
                                    <option value="voter's card">Voter's Card</option>
                                    <option value="passport">Passport</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs sm:text-sm font-medium mb-1" htmlFor="idNumber">ID Number</label>
                                <input
                                    className={inputClass}
                                    type="text"
                                    id="idNumber"
                                    placeholder="ID Number"
                                    aria-label="ID Number"
                                    onChange={handleInputChange}
                                    value={riderInfo.idNumber}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setShowDialog(false)} className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Cancel</button>
                            <button type="button" onClick={handleAddRider} className="px-4 py-2 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600">Add Rider</button>
                        </div>
                    </form>
                </ReusableDialog>
            )}

            {/* Riders table section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <Container>
                    {/* Table header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white gap-3 mb-3">
                        <div>
                            <h6 className="font-bold text-base sm:text-xl font-sans">Riders List</h6>
                            <p className="text-xs sm:text-sm text-gray-500">Manage your delivery team</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <input
                                className="w-full sm:w-[200px] md:w-[240px] h-9 px-3 border border-gray-300 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-orange-200"
                                type="text"
                                placeholder="Search riders..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                className="bg-orange-500 flex justify-center items-center text-white text-sm px-4 py-2 rounded-md hover:bg-[#FF833C] whitespace-nowrap h-9"
                                onClick={() => setShowDialog(true)}
                            >
                                <Plus className="w-4 h-4 mr-1" /> Add Rider
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto border rounded-md">
                        <table className="min-w-full bg-white text-sm">
                            <thead>
                                <tr className="bg-gray-50">
                                    {['Rider', 'Contact', 'Location', 'Status', 'Performance', 'Actions'].map(h => (
                                        <th key={h} className="py-2 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRiders.map((rider) => (
                                    <tr key={rider.id} className="hover:bg-gray-50 transition">
                                        <td className="py-3 px-4 border-b border-gray-100 whitespace-nowrap">
                                            <span className="border p-1 rounded-full border-orange-400 mr-2">
                                                <FontAwesomeIcon icon={faUser} style={{ fontSize: '0.75rem', color: '#FF833C' }} />
                                            </span>
                                            <span className="text-xs font-medium">{title(rider.user.name.split(' ')[0])}</span>
                                        </td>
                                        <td className="py-3 px-4 border-b border-gray-100">
                                            <p className="text-xs text-gray-600 flex items-center gap-1">
                                                <Phone className="w-3 h-3" />
                                                {rider.user.country === 'nigeria' ? '+234' : '+233'}-{rider?.user?.phone_number}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">{rider.user.email}</p>
                                        </td>
                                        <td className="py-3 px-4 border-b border-gray-100">
                                            <p className="text-xs text-gray-600 flex items-center gap-1">
                                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                                {title(rider.user.address)}
                                            </p>
                                        </td>
                                        <td className="py-3 px-4 border-b border-gray-100">
                                            {rider.status.toLowerCase() === 'busy' ? (
                                                <span className="text-xs border border-red-400 bg-red-50 rounded-full px-2 py-0.5 text-red-500">{rider.status}</span>
                                            ) : rider.status.toLowerCase() === 'inactive' ? (
                                                <span className="text-xs border border-blue-300 bg-gray-50 rounded-full px-2 py-0.5 text-gray-600">{rider.status}</span>
                                            ) : (
                                                <span className="text-xs border border-green-400 bg-green-50 rounded-full px-2 py-0.5 text-green-500">{rider.status}</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 border-b border-gray-100">
                                            <p className="text-xs font-semibold">{rider.total_delivery}/{rider.total_assigned_orders} deliveries</p>
                                            <p className="text-xs text-gray-500 mt-0.5">⭐ {rider.rating} rating</p>
                                        </td>
                                        <td className="py-3 px-4 border-b border-gray-100">
                                            <div className="flex gap-1">
                                                <div className="p-1.5 border border-transparent hover:border-orange-400 rounded cursor-pointer">
                                                    <Eye size={14} />
                                                </div>
                                                <div className="p-1.5 border border-transparent hover:border-orange-400 rounded cursor-pointer">
                                                    <Edit size={14} />
                                                </div>
                                                <div className="p-1.5 border border-transparent hover:border-orange-400 rounded cursor-pointer" onClick={() => handleRiderDeleteConfirmation(rider.id, rider.user.name)}>
                                                    <Trash2 size={14} className="text-red-500" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Delete dialog */}
                    {showRiderDeleteDialog && (
                        <DeleteDialog>
                            <div className="flex justify-between w-full mb-4">
                                <div>
                                    <h2 className="font-medium text-base">Delete Rider</h2>
                                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                        Are you sure you want to delete <span className="font-medium">{title(riderToDelete.name)}</span>? This action cannot be undone.
                                    </p>
                                </div>
                                <span className="cursor-pointer text-gray-400 hover:text-gray-700" onClick={() => setShowRiderDeleteDialog(false)}>✕</span>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setShowRiderDeleteDialog(false)} className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Cancel</button>
                                <button type="button" onClick={handleRiderDelete} className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
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