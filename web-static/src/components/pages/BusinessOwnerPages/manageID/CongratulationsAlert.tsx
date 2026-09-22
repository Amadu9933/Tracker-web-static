import React, { useState } from "react";
import Copy from "./asset/Copy-icon.png";
import { MdClose } from "react-icons/md";
import {useNavigate} from 'react-router-dom'

interface CongratulationsAlertProps {
    trackingID: string;
    onClose: () => void;
}

const CongratulationsAlert: React.FC<CongratulationsAlertProps> = ({ trackingID, onClose }) => {
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate()

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(trackingID);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const el = document.createElement("textarea");
            el.value = trackingID;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <div
                className="
                    bg-white 
                    border border-gray-200 
                    max-w-6xl h-[469px] rounded-lg shadow-lg
                    
                    text-center px-44 relative
                    transition-colors duration-200
                "
            >
                {/* Close Button */}
                <button
                    className="
                        absolute top-4 right-6

                       
                    "
                    onClick={onClose}
                    aria-label="Close"
                >
                    <MdClose size={20} style={{ color: 'red' }} />
                </button>

                {/* Modal Content */}
                <div className="pt-28">
                    <p className="font-medium text-xl leading-5 text-secondary  mb-3">
                        Congratulations!
                    </p>
                    <p className="text-sm text-[#48463A]  leading-5 mb-5">
                        Tracking number has been generated
                    </p>

                    {/* Tracking ID & Copy Icon */}
                    <div className="flex justify-center items-center gap-5 mb-5">
                        <p className="text-primary  font-medium text-lg">
                            {trackingID}
                        </p>
                        {/* Copy Icon with tooltip feedback */}
                        <div className="relative flex items-center">
                            <img
                                src={Copy}
                                alt="Copy Icon"
                                onClick={handleCopy}
                                title="Copy tracking ID"
                                className="
                                    cursor-pointer
                                    
                                    hover:opacity-80 active:scale-90
                                    transition-all duration-200
                                "
                            />
                            {copied && (
                                <span
                                    className="
                                        absolute -top-8 left-1/2 -translate-x-1/2
                                        bg-gray-800 
                                        text-white text-xs
                                        px-2 py-1 rounded
                                        whitespace-nowrap
                                        pointer-events-none
                                        animate-fade-in
                                    "
                                >
                                    Copied!
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Activate Button */}
                    <button
                        className="
                            w-36 sm:w-auto px-8 py-2.5
                            bg-[#FF833C] 
                            text-white
                            rounded-lg
                            hover:bg-[#e6722e] 
                            
                            transition-all duration-200
                            flex items-center justify-center gap-2
                            text-sm font-medium
                            mx-auto
                        "
                        onClick={() => navigate(`/dashboard/trackings/${trackingID}/`)}
                    >
                        Activate
                    </button>

                    <p className="pt-8 text-gray-700 ">Preview</p>
                </div>
            </div>
        </div>
    );
};

export default CongratulationsAlert;