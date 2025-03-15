import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ArrowBack } from "../auth/assets/Assets";
import CongratulationsAlert from "./CongratulationsAlert";

const GenerateTrackingID = () => {
    const [trackingID, setTrackingID] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false); // Controls modal visibility

    const token = localStorage.getItem('access');

    // ✅ Validation Schema
    const validationSchema = Yup.object({
        shippingAddress: Yup.string().required("Shipping address is required"),
        country: Yup.string().required("Country is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string()
            .matches(/^\d{10,11}$/, "Invalid phone number")
            .required("Phone number is required"),
        productName: Yup.string().required("Product name is required"),
        numberOfProducts: Yup.number()
            .min(1, "At least 1 product required")
            .required("Number of products is required"),
        estimatedDeliveryDate: Yup.date().required("Delivery date is required"),
    });

    // ✅ Formik Hook
    const formik = useFormik({
        initialValues: {
            shippingAddress: "",
            country: "",
            email: "",
            phone: "",
            productName: "",
            numberOfProducts: "",
            estimatedDeliveryDate: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            if (loading) return; // ✅ Prevent multiple submits

            setLoading(true);
            setError(null);
            setTrackingID(null); // Reset previous tracking ID

            const requestData = {
                shipping_address: values.shippingAddress,
                country: values.country,
                product: values.productName,
                customer_email: values.email,
                quantity: values.numberOfProducts.toString(),
                delivery_date: values.estimatedDeliveryDate,
            };

            try {
                const response = await axios.post(
                    "https://trackerr.live/api/v1/trackings/generate-tracking/",
                    requestData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`, // ✅ Corrected Bearer token
                        },
                    }
                );

                setTrackingID(response.data.parcel_number); // ✅ Set generated tracking ID
                setShowModal(true); // ✅ Show modal
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data?.detail || "Failed to generate tracking ID");
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white text-left text-[#48463A]">
            <h2 className="text-xl text-secondary font-semibold mb-4">
                <img src={ArrowBack} alt="Back icon" className="inline mr-2 h-6" />
                Generate Tracking I.D
            </h2>

            <p className="text-xs text-[#ABABAB] my-10 font-semibold">Customer details</p>

            {/* Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/** Shipping Address */}
                    <div>
                        <label className="block font-medium">Shipping Address</label>
                        <input
                            type="text"
                            name="shippingAddress"
                            value={formik.values.shippingAddress}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {formik.touched.shippingAddress && formik.errors.shippingAddress && (
                            <p className="text-red-500">{formik.errors.shippingAddress}</p>
                        )}
                    </div>

                    {/** Country */}
                    <div>
                        <label className="block font-medium">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {formik.touched.country && formik.errors.country && (
                            <p className="text-red-500">{formik.errors.country}</p>
                        )}
                    </div>

                    {/** Customer Email */}
                    <div>
                        <label className="block font-medium">Customer Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500">{formik.errors.email}</p>
                        )}
                    </div>

                    {/** Phone Number */}
                    <div>
                        <label className="block font-medium">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-red-500">{formik.errors.phone}</p>
                        )}
                    </div>

                    {/** Product Name */}
                    <div>
                        <label className="block font-medium">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={formik.values.productName}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {formik.touched.productName && formik.errors.productName && (
                            <p className="text-red-500">{formik.errors.productName}</p>
                        )}
                    </div>

                    {/** Number of Products */}
                    <div>
                        <label className="block font-medium">Number of Products</label>
                        <input
                            type="number"
                            name="numberOfProducts"
                            value={formik.values.numberOfProducts}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {formik.touched.numberOfProducts && formik.errors.numberOfProducts && (
                            <p className="text-red-500">{formik.errors.numberOfProducts}</p>
                        )}
                    </div>

                    {/** Estimated Delivery Date */}
                    <div className="md:col-span-2">
                        <label className="block font-medium">Estimated Delivery Date</label>
                        <input
                            type="date"
                            name="estimatedDeliveryDate"
                            value={formik.values.estimatedDeliveryDate}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {formik.touched.estimatedDeliveryDate && formik.errors.estimatedDeliveryDate && (
                            <p className="text-red-500">{formik.errors.estimatedDeliveryDate}</p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className={`bg-primary text-white p-2 rounded font-semibold w-full sm:w-1/2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate Tracking ID"}
                    </button>
                </div>
            </form>

            {/* Modal */}
            {showModal && trackingID && (
                <CongratulationsAlert trackingID={trackingID} onClose={() => setShowModal(false)} />
            )}

            {/* Display Error */}
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
    );
};

export default GenerateTrackingID;
