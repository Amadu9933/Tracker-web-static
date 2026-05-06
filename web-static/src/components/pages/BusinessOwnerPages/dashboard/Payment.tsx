import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from '../../../../context/ThemeContext';
import { MdClose } from "react-icons/md";

import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

import { useAuth } from "../../../../context/AuthContext";

export default function Payment({ showDialog }: any) {
    const { isDarkMode } = useTheme();

    const [ngnEquivalent, setNgnEquivalent] = useState<number>(0.0);
    const rate = 123.3;// Example exchange rate, you can fetch this from an API
    const [showBtn, setShowBtn] = useState(false)
    const [paymentError, setPaymentError] = useState<string | null>(null)
    const [btnText, setBtnText] = useState<string>('Proceed to Top Up')

    const { user } = useAuth();

    const getCountry = () => {
        return user?.user?.country;
    }


    const handleTopUp = async () => {
        if (btnText === 'Processing...') return; // Prevent multiple clicks
        setBtnText('Processing...');
        const access_token = localStorage.getItem('access');
        if (!access_token) {
            setPaymentError('No access token found. Please logout and login again.')
            return;
        }
        // Proceed with top-up logic, e.g., redirect to payment gateway or call API
        console.log('Proceeding to top up with amount in NGN:', ngnEquivalent);
        try {
            const res = await fetch(`${import.meta.env.VITE_TRACKERR_HOST}/payments/initialize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                    'Idempotency-Key': crypto.randomUUID() // Ensure idempotency for the top-up request
                },
                body: JSON.stringify({
                    amount: ngnEquivalent
                })
            })
            const data = await res.json();
            if (res.ok) {
                // redirect to payment gateway using the URL from the response
                setBtnText("Proceed to Top Up")
                window.location.href = data?.autorization_url
            }
        } catch (error) {
            console.error('Error occurred while initializing payment:', error);
            setBtnText("Proceed to Top Up")
            setPaymentError('An error occurred while processing your request. Please try again.');
            setTimeout(() => {
                setPaymentError(null);
            }, 3000);
        }
    }


    const handleShowBtn = (value: string) => {
        const amount = parseFloat(value)
        if (getCountry() === 'nigeria') {
            if (amount >= 1000) {
                setShowBtn(true);
                return;
            } else {
                setPaymentError('Minimum deposit is ₦ 1,000')
                setTimeout(() => {
                    setPaymentError(null)
                }, 2000)
            }
        } else if (getCountry() === 'ghana') {
            if (amount >= 10) {
                setShowBtn(true);
                return;
            } else {
                setPaymentError('Minimum deposit is GH₵ 10')
                setTimeout(() => {
                    setPaymentError(null)
                }, 2000)
            }
        }
        setShowBtn(false);
    }

    const convertToNgn = (amount: string) => {
        if (getCountry() === 'nigeria') {
            setNgnEquivalent(parseFloat(amount))
            return
        }
        const ghanaCedis = parseFloat(amount);
        if (!isNaN(ghanaCedis)) {
            setNgnEquivalent(ghanaCedis);
        }
        return
    }
    return (
        <div
            className={`border ${isDarkMode ? 'border-slate-700 bg-slate-950 shadow-slate-900/40' : 'border-slate-200 bg-white shadow-lg'} w-full max-w-[25rem] rounded-lg flex p-4 flex-col`}
        >
            <div className='flex justify-between w-full'>
                <h2 className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-lg`}>Top Up Wallet</h2>

                <MdClose
                    size={20}
                    style={{ fontSize: '1rem', color: '#FF833C' }}
                    onClick={() => showDialog(false)} />
            </div>
            <h3 className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} text-sm mt-4 mb-10`}>
                Enter the amount you'd like to add to your Trackerr wallet.
            </h3>
            <div
                className='flex justify-center w-full gap-4 mb-5'
            >
                <div className="w-full max-w-[12rem]">
                    <h3 className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} text-sm mb-2 text-center`}>
                        Amount in {getCountry() === 'nigeria' ? "(NGN)" : "(GHS)"}
                    </h3>
                    <div
                        className="flex justify-center items-center border border-orange-300 rounded-md px-3 py-2 bg-transparent dark:bg-slate-900"
                    >
                        <span
                            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'} text-sm mr-3`}
                        >
                            {getCountry() === 'nigeria' ? "(₦)" : "(GH₵)"}
                        </span>
                        <input
                            type='number'
                            step={getCountry() === 'nigeria' ? "100" : "0.1"}
                            placeholder='0.0'
                            min={0.0}
                            onChange={(x) => { convertToNgn(x.target.value) }}
                            onBlur={(x) => handleShowBtn(x.target.value)}
                            className={`w-full  rounded-md px-2 ${isDarkMode ? 'bg-transparent focus:outline-none focus:ring-0 focus:border-transparent text-center text-gray-100 placeholder:text-gray-400' : 'bg-transparent focus:outline-none focus:ring-0 focus:border-transparent text-center text-gray-900 placeholder:text-gray-400'}`}
                        />
                    </div>
                </div>
        

            </div>
            {
                getCountry() != 'nigeria' && (
                    <h3 className={`text-center text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-500'}`}>1 GHS ≈ {rate} NGN </h3>
                )
            }

            <div
                className="flex flex-col sm:flex-row items-start sm:items-center mt-6 bg-orange-100 dark:bg-slate-700 w-full rounded-lg p-4 mb-5 gap-3 min-w-0"
            >
                <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faTriangleExclamation} style={{ fontSize: '1rem', color: '#FF833C' }} />
                </div>
                <h3 className="text-sm text-gray-500 dark:text-gray-200 break-words whitespace-normal min-w-0">
                    The total amount at checkout may vary slightly due to applicable taxes, processing fees, or exchange rate fluctuations.
                </h3>
            </div>
            {paymentError && <p className="text-red-500 text-sm text-center mb-4">{paymentError}</p>}
            <div className="w-full flex justify-center items-center">
                {showBtn && (
                    <button
                        type="button"
                        onClick={handleTopUp}
                        className="w-full max-w-xs rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
                    >
                        {btnText}
                    </button>
                )}
            </div>
        </div>
    )
}