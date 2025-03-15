import React from "react";
import Copy from "./asset/Copy-icon.png";

interface CongratulationsAlertProps {
    trackingID: string;
    onClose: () => void; // Function to close the modal
}

const CongratulationsAlert: React.FC<CongratulationsAlertProps> = ({ trackingID, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white border max-w-6xl h-[469px] rounded-lg shadow-lg text-center px-44 relative">
                {/* Close Button */}
                <button className="absolute top-4 right-6 text-gray-600 text-2xl" onClick={onClose}>
                    ×
                </button>

                {/* Modal Content */}
                <div className="pt-28">
                    <p className="font-medium text-xl leading-5 text-secondary mb-3">Congratulations!</p>
                    <p className="text-sm text-[#48463A] leading-5 mb-5">Tracking number has been generated</p>

                    {/* Tracking ID & Copy Icon */}
                    <div className="flex justify-center items-center gap-5 mb-5">
                        <p className="text-primary font-medium text-lg">{trackingID}</p>
                        <img src={Copy} alt="Copy Icon" className="cursor-pointer" />
                    </div>

                    {/* Activate Button */}
                    <button
                        className="bg-primary w-36 px-5 py-3 leading-6 gap-2 rounded-lg hover:bg-orange-500 text-white"
                        onClick={onClose}
                    >
                        Activate
                    </button>
                    <p className="pt-8">Preview</p>
                </div>
            </div>
        </div>
    );
};

export default CongratulationsAlert;
