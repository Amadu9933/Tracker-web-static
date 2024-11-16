import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';


type BusinessInfoFormData = {
    businessName: string;
    service: string;
    address: string;
};

// Yup validation schema
const schema = yup.object().shape({
    businessName: yup
        .string()
        .required('Business name is required')
        .min(2, 'Business name must be at least 2 characters'),
    service: yup
        .string()
        .required('Service is required')
        .min(2, 'Service must be at least 2 characters'),
    address: yup
        .string()
        .required('Address is required')
        .min(5, 'Address must be at least 5 characters'),
});

const BusinessInfoForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BusinessInfoFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: BusinessInfoFormData) => {
        console.log('Business Info:', data);
        // Handle form submission (e.g., API call to save business info)
    };

    return (
        <div className=" h-screen text-left">
            <div className="flex justify-left overflow-hidden max-w-4xl w-full">
                {/* Picture Section */}


                {/* Form Section */}
                <div className="w-full md:w-full p-6">
                    <div className="flex justify-between mb-8">
                        <p className="text-lg text-secondary">Buisness information</p>
                        <p className="text-sm text-[#82826A]">Step 2 of 3</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Business Name Field */}
                        <div>
                            <label
                                htmlFor="businessName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Business Name
                            </label>
                            <input
                                id="businessName"
                                type="text"
                                {...register('businessName')}
                                className={`mt-1 p-2 border placeholder-[#A3A38E] rounded-md w-full ${errors.businessName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="xyz company"
                            />
                            {errors.businessName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.businessName.message}
                                </p>
                            )}
                        </div>

                        {/* Service Field */}
                        <div>
                            <label
                                htmlFor="service"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Service
                            </label>
                            <input
                                id="service"
                                type="text"
                                {...register('service')}
                                className={`mt-1 p-2 border placeholder-[#A3A38E] rounded-md w-full ${errors.service ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="parcel delivery"
                            />
                            {errors.service && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.service.message}
                                </p>
                            )}
                        </div>

                        {/* Address Field */}
                        <div>
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Address
                            </label>
                            <input
                                id="address"
                                type="text"
                                {...register('address')}
                                className={`mt-1 p-2 border placeholder-[#A3A38E] rounded-md w-full ${errors.address ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="sadams, zz213 akwatia street"
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-primary text-white p-2 rounded-md w-full hover:bg-primary"
                        >
                            Continue
                        </button>
                        {/* Sign In Link */}
                        <p className="text-center text-sm mt-4">
                            Already have an account?{' '}
                            <Link to="/sign-in" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BusinessInfoForm;
