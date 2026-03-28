import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ArrowBack } from "../auth/assets/Assets";
import CongratulationsAlert from "./CongratulationsAlert";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;

const inputClass =
    "w-full p-2.5 sm:p-3 text-sm border border-gray-300 dark:border-gray-600 rounded-md " +
    "placeholder:text-[#A3A38E] dark:placeholder:text-gray-500 " +
    "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 " +
    "focus:border-primary focus:ring-1 focus:ring-primary/40 focus:outline-none " +
    "dark:focus:border-primary dark:focus:ring-primary/40 transition-colors duration-200";

const labelClass = "block text-sm sm:text-base font-medium mb-1 text-gray-700 dark:text-gray-300";
const errorClass = "text-red-500 dark:text-red-400 text-xs mt-1";

const fields = [
    {
        name: "shippingAddress",
        label: "Shipping Address",
        type: "text",
        placeholder: "e.g. 12 Accra Road, Kumasi",
    },
    {
        name: "name",
        label: "Customer Name",
        type: "text",
        placeholder: "e.g. John Mensah",
    },
    {
        name: "email",
        label: "Customer Email",
        type: "email",
        placeholder: "e.g. john@example.com",
    },
    {
        name: "phone",
        label: "Phone Number",
        type: "text",
        placeholder: "e.g. 0244567890",
    },
    {
        name: "productName",
        label: "Product Name",
        type: "text",
        placeholder: "e.g. Wireless Headphones",
    },
    {
        name: "numberOfProducts",
        label: "Number of Products",
        type: "number",
        placeholder: "e.g. 3",
    },
    {
        name: "estimatedDeliveryDate",
        label: "Estimated Delivery Date",
        type: "date",
        placeholder: "",
    },
    {
        name: "country",
        label: "Country",
        type: "text",
        placeholder: "e.g. Ghana",
    },
];

const GenerateTrackingID = () => {
    const [trackingID, setTrackingID] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const token = localStorage.getItem("access");
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        shippingAddress: Yup.string().required("Shipping address is required"),
        country: Yup.string().required("Country is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        name: Yup.string().required("Name is required"),
        phone: Yup.string()
            .matches(/^\d{10,11}$/, "Invalid phone number")
            .required("Phone number is required"),
        productName: Yup.string().required("Product name is required"),
        numberOfProducts: Yup.number()
            .min(1, "At least 1 product required")
            .required("Number of products is required"),
        estimatedDeliveryDate: Yup.date().required("Delivery date is required"),
    });

    const formik = useFormik({
        initialValues: {
            shippingAddress: "",
            country: "",
            name: "",
            email: "",
            phone: "",
            productName: "",
            numberOfProducts: "",
            estimatedDeliveryDate: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            if (loading) return;
            setLoading(true);
            setError(null);
            setTrackingID(null);

            try {
                const response = await axios.post(
                    `${TRACKERR_HOST}/trackings/generate-tracking/`,
                    {
                        shipping_address: values.shippingAddress,
                        country: values.country,
                        product: values.productName,
                        customer_email: values.email,
                        customer_name: values.name,
                        quantity: values.numberOfProducts.toString(),
                        delivery_date: values.estimatedDeliveryDate,
                        phone: values.phone,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTrackingID(response.data.parcel_number);
                setShowModal(true);
            } catch (error: unknown) {
                setError(
                    axios.isAxiosError(error)
                        ? error.response?.data?.detail ||
                        "Oops! We couldn't generate a tracking ID right now. Please try again."
                        : "Something unexpected happened. Please try again or contact support."
                );
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 bg-white dark:bg-[#0b111f] text-left text-[#48463A] dark:text-gray-100 transition-colors duration-200"
        >
            {/* Header */}
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-lg sm:text-xl text-secondary dark:text-gray-100 font-semibold mb-4 flex items-center gap-2"
            >
                <img
                    src={ArrowBack}
                    alt="Back icon"
                    onClick={() => navigate(-1)}
                    className="h-5 sm:h-6 cursor-pointer dark:invert dark:[filter:invert(1)_sepia(1)_saturate(5)_hue-rotate(2deg)_brightness(1)]
            dark:[filter:invert(55%)_sepia(90%)_saturate(500%)_hue-rotate(1deg)_brightness(105%)]"
                    style={{ filter: undefined }}
                />
                Generate Tracking I.D
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-[#ABABAB] dark:text-gray-500 my-6 sm:my-10 font-semibold uppercase tracking-wide"
            >
                Customer details
            </motion.p>

            {/* Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {fields.map(({ name, label, type, placeholder }, index) => (
                        <motion.div
                            key={name}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.06, duration: 0.4 }}
                        >
                            <label className={labelClass}>{label}</label>
                            <input
                                type={type}
                                name={name}
                                placeholder={placeholder}
                                value={formik.values[name as keyof typeof formik.values]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={inputClass}
                            />
                            {formik.touched[name as keyof typeof formik.touched] &&
                                formik.errors[name as keyof typeof formik.errors] && (
                                    <p className={errorClass}>
                                        {formik.errors[name as keyof typeof formik.errors] as string}
                                    </p>
                                )}
                        </motion.div>
                    ))}
                </div>

                {/* Submit */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex justify-center mt-6"
                >
                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        type="submit"
                        disabled={loading}
                        className={`bg-primary dark:bg-transparent dark:border-2 dark:border-primary
              dark:text-primary dark:hover:bg-primary dark:hover:text-white
              dark:shadow-[0_0_12px_rgba(249,115,22,0.25)]
              text-white py-2.5 px-6 rounded font-semibold text-sm sm:text-base
              w-full sm:w-1/2 transition-all duration-200
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Generating..." : "Generate Tracking ID"}
                    </motion.button>
                </motion.div>
            </form>

            {/* Error */}
            {error && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-red-500 dark:text-red-400 text-xs sm:text-sm text-center"
                >
                    {error}
                </motion.p>
            )}

            {/* Modal */}
            {showModal && trackingID && (
                <CongratulationsAlert
                    trackingID={trackingID}
                    onClose={() => {
                        setShowModal(false);
                        navigate(`/dashboard/trackings/${trackingID}`, {
                            state: { parcel_number: trackingID },
                        });
                    }}
                />
            )}
        </motion.div>
    );
};

export default GenerateTrackingID;