import { useFormik } from "formik";
import * as Yup from "yup";
import { ArrowBack } from "../auth/assets/Assets";

const GenerateTrackingID = () => {
    // Validation Schema
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
        logisticsContact: Yup.string().required("Logistics contact is required"),
    });

    // Formik Hook
    const formik = useFormik({
        initialValues: {
            shippingAddress: "",
            country: "",
            email: "",
            phone: "",
            productName: "",
            numberOfProducts: "",
            estimatedDeliveryDate: "",
            logisticsContact: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("Submitted Data:", values);
            alert("Tracking ID Generated Successfully!");
        },
    });

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white text-left text-[#48463A] ">
            <h2 className="text-xl text-secondary font-semibold mb-4 text-left">
                <img src={ArrowBack} alt="Back icon" className="inline mr-2 h-6 text-xl" />
                Generate Tracking I.D
            </h2>
            <p className="text-xs text-[#ABABAB] my-10 font-semibold">Customer details</p>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                    {/* Shipping Address */}
                    <div>
                        <label className="block font-medium ">Shipping Address</label>
                        <input
                            type="text"
                            name="shippingAddress"
                            value={formik.values.shippingAddress}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded"
                            placeholder="Enter shipping address"
                        />
                        {formik.touched.shippingAddress && formik.errors.shippingAddress && (
                            <p className="text-red-500">{formik.errors.shippingAddress}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium pt-6">Customer Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className="w-full border p-2.5 rounded"
                            placeholder="Enter customer email"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500">{formik.errors.email}</p>
                        )}
                    </div>
                    <p className="text-[#ABABAB] text-xs font-semibold pt-10 pb-7 "> Delivery details</p>
                    {/* Product Name */}
                    <div className="">
                        <label className="block font-medium">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={formik.values.productName}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded"
                            placeholder="Enter product name"
                        />
                        {formik.touched.productName && formik.errors.productName && (
                            <p className="text-red-500">{formik.errors.productName}</p>
                        )}
                    </div>

                    {/* Estimated Delivery Date */}
                    <div>
                        <label className="block font-medium pt-6">Estimated Delivery Date</label>
                        <input
                            type="date"
                            name="estimatedDeliveryDate"
                            value={formik.values.estimatedDeliveryDate}
                            onChange={formik.handleChange}
                            className="w-full border p-2.5 rounded"
                        />
                        {formik.touched.estimatedDeliveryDate &&
                            formik.errors.estimatedDeliveryDate && (
                                <p className="text-red-500">{formik.errors.estimatedDeliveryDate}</p>
                            )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    {/* Country */}
                    <div>
                        <label className="block font-medium">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded"
                            placeholder="Enter country"
                        />
                        {formik.touched.country && formik.errors.country && (
                            <p className="text-red-500">{formik.errors.country}</p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block font-medium pt-6">Customer Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded"
                            placeholder="Enter phone number"
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-red-500">{formik.errors.phone}</p>
                        )}
                    </div>

                    {/* Number of Products */}
                    <div className="pt-[103px]">
                        <label className="block font-medium">Number of Products</label>
                        <input
                            type="number"
                            name="numberOfProducts"
                            value={formik.values.numberOfProducts}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded"
                            placeholder="Enter quantity"
                        />
                        {formik.touched.numberOfProducts && formik.errors.numberOfProducts && (
                            <p className="text-red-500">{formik.errors.numberOfProducts}</p>
                        )}
                    </div>

                    {/* Logistics Contact */}
                    <div>
                        <label className="block font-medium pt-6">Logistics Contact</label>
                        <input
                            type="text"
                            name="logisticsContact"
                            value={formik.values.logisticsContact}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded"
                            placeholder="Enter logistics contact"
                        />
                        {formik.touched.logisticsContact && formik.errors.logisticsContact && (
                            <p className="text-red-500">{formik.errors.logisticsContact}</p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-2 flex justify-center items-center  mt-20 h-16">
                    <button
                        type="submit"
                        className="bg-primary text-base  h-10 text-white p-2 rounded font-semibold w-1/2"
                    >
                        Generate Tracking ID
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GenerateTrackingID;
