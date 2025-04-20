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
        <div className="px-[10%] pt-16 bg-gray-300 rounded-lg w-[60%] h-[450px] text-left mx-auto">
            <h1 className="text-lg font-bold text-gray-700 flex mb-6">
                <ArrowBackIcon className="mr-3" />
                Enter OTP
            </h1>

            <div className="flex items-center mb-4">
                <input
                    type="radio"
                    id="business"
                    name="tab"
                    value="business"
                    checked={activeTab === 'business'}
                    onChange={() => setActiveTab('business')}
                    className="mr-2 accent-black"
                />
                <label htmlFor="business" className="mr-4 font-medium">Business</label>

                <input
                    type="radio"
                    id="logistics"
                    name="tab"
                    value="logistics"
                    checked={activeTab === 'logistics'}
                    onChange={() => setActiveTab('logistics')}
                    className="mr-2 accent-black"
                />
                <label htmlFor="logistics" className="font-medium">Logistics</label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-sm mb-4">
                    Please check your email: janedoe@gmail.com and enter the temporary password sent to enable you reset your password.
                </h2>

                <div className="mb-4">
                    <input
                        id="otp"
                        type="password"
                        {...register('otp')}
                        placeholder="Enter OTP"
                        className={`mt-1 block w-full placeholder-[#A3A38E] p-2 border rounded-md ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.otp && (
                        <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="flex justify-center items-center font-bold text-blue-600 mt-4"
                >
                    <span className="mr-2">Next</span>
                    <ArrowForwardIcon sx={{ height: 16 }} />
                </button>
            </form>
        </div>
    );
};

export default Otp;
