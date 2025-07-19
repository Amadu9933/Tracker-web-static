import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Validation schema using Yup
const otpSchema = yup.object().shape({
    otp: yup
        .string()
        .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
        .required('OTP is required'),
});

interface OtpFormData {
    otp: string;
}

const Otp: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'business' | 'logistics'>('business');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OtpFormData>({
        resolver: yupResolver(otpSchema),
    });

    const onSubmit = (data: OtpFormData) => {
        console.log(`Verifying OTP ${data.otp} in ${activeTab} tab`);
        alert(`OTP verified for ${activeTab} tab`);
        navigate(`/reset-password/${data.otp}`); // ✅ Passing OTP via URL
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                {/* Title Section */}
                <div className="text-center">
                    <h1 className="text-lg font-bold text-gray-700 flex items-center justify-center mb-6">
                        <div onClick={() => navigate(-1)} className="cursor-pointer mr-3">
                            <ArrowBackIcon />
                        </div>
                        Enter OTP
                    </h1>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center mr-6">
                        <input
                            type="radio"
                            id="business"
                            name="tab"
                            value="business"
                            checked={activeTab === 'business'}
                            onChange={() => setActiveTab('business')}
                            className="mr-2 accent-primary"
                        />
                        <label htmlFor="business" className="font-medium">Business</label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="logistics"
                            name="tab"
                            value="logistics"
                            checked={activeTab === 'logistics'}
                            onChange={() => setActiveTab('logistics')}
                            className="mr-2 accent-primary"
                        />
                        <label htmlFor="logistics" className="font-medium">Logistics</label>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-sm text-gray-600 mb-4">
                            Please check your email: janedoe@gmail.com and enter the temporary password sent to enable you reset your password.
                        </h2>
                    </div>

                    <div>
                        <input
                            id="otp"
                            type="password"
                            {...register('otp')}
                            placeholder="Enter OTP"
                            className={`w-full placeholder-[#A3A38E] p-3 border rounded-md focus:ring-primary focus:border-primary ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.otp && (
                            <p className="text-red-500 text-sm mt-1 text-center">{errors.otp.message}</p>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="flex items-center font-bold text-primary hover:text-primary-dark transition-colors"
                        >
                            <span className="mr-2">Next</span>
                            <ArrowForwardIcon sx={{ height: 16 }} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Otp;
