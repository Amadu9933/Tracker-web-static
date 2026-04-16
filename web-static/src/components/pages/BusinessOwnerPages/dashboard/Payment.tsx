import SecondaryButton from "@components/common/buttons/Mybutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from '../../../../context/ThemeContext';


import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

import {  useAuth } from "../../../../context/AuthContext";
import { accessToken } from "mapbox-gl";

export default function Payment({showDialog}: any) {
  const { isDarkMode } = useTheme();

  const [ngnEquivalent, setNgnEquivalent] = useState<number>(0.0);
  const rate = 123.3;// Example exchange rate, you can fetch this from an API
  const [showBtn, setShowBtn] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [btnText, setBtnText] = useState<string>('Proceed to Top Up')

  const { user } = useAuth();

  const getCountry  = () => {
    return user?.user?.country
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
            }, 5000)
        }
    } else if (getCountry() === 'ghana') {
        if (amount >= 10) {
            setShowBtn(true);
            return;
        } else {
            setPaymentError('Minimum deposit is GH₵ 10')
            setTimeout(() => {
                setPaymentError(null)
            }, 5000)
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
      setNgnEquivalent(ghanaCedis * rate);
    }
    return
  }
  return (
    <div
      className={`border w-[25rem] h-1/2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg flex p-4 flex-col`}
    >
    <div
      className='flex justify-between w-full'
    >
        <h2 className='text-lg'>Top Up Wallet</h2>
        <h2
          onClick={()=>showDialog(false)}
          className="text-red-500 cursor-pointer"
        >X</h2>
    </div>
    <h3 className='text-sm text-gray-800 mt-4 mb-10'>Enter the amount you'd like to add to your Trackerr wallet.</h3>
    <div
        className="flex {getCountry() === 'nigeria'? justify-center : justify-between} w-full gap-4 mb-5"
    >
        <div>
            <h3 className='text-sm text-gray-800 mb-2 text-center'>Amount in {getCountry() === 'nigeria'? "(NGN)" : "(GHS)"}</h3>
            <div
                className="flex justify-center dark:bg-gray-800 items-center border border-orange-300 rounded-md pl-2"
            >
                <h2
                className='text-sm text-gray-400'
                >
                     {getCountry() === 'nigeria'? "(₦)" : "(GH₵)"}
                </h2>
                <input
                type='number'
                step={getCountry() === 'nigeria'? "100" : "0.1"}
                    placeholder='0.0'
                    min={0.0}
                    onChange={(x) =>convertToNgn(x.target.value)}
                    onBlur={(x) => handleShowBtn(x.target.value)}
                    className={`w-[100px] h-10 rounded-md p-2 ${isDarkMode ? 'focus:outline-none focus:ring-0 focus:ring-blue-500 text-center focus:border-none' : 'focus:outline-none focus:ring-0 focus:ring-blue-500 text-center focus:border-white'}`}
                />
            </div>
        </div>
        {getCountry() !='nigeria' && (
        <>
            <span
            className='text-2xl text-gray-400 mt-6 justify-center items-center flex'
            >=</span>
            <div>
                <h3 className='text-sm text-gray-800 mb-2 text-center'>Equivalent in (NGN)</h3>
                <div
                    className="flex justify-center items-center border border-orange-300 rounded-md pl-2 h-[2.6rem]"
                >
                    <h2
                    className='text-sm text-gray-500'
                    >
                    ₦ {ngnEquivalent.toFixed(2)}
                    </h2>
                </div>
            </div>
        </>
        )}
        
    </div>
    {
        getCountry() != 'nigeria' && (
            <h3 className="text-center text-sm text-gray-500">1 GHS ≈ {rate} NGN </h3>
        )
    }
    
    <div
        className="flex justify-center items-center mt-6 bg-orange-100 dark:bg-gray-700 w-full rounded-lg h-100 p-4 mb-5 gap-2"    
    >
        <FontAwesomeIcon icon={faTriangleExclamation} style={{ fontSize: '1rem', color: '#FF833C' }} />
        <h3
            className={`text-sm text-gray-500`}
        >
            The total amount at checkout may vary slightly due to applicable taxes, processing fees, or exchange rate fluctuations.
        </h3>
    </div>
    <span>{paymentError && <p className={`text-red-500 text-sm text-center`}>{paymentError}</p>}</span>
    <div className="w-full flex justify-center items-center">
        {
            showBtn && (
            <SecondaryButton
                label={btnText}
                // color="red"
                background="#FF833C"
                onClick={() => handleTopUp()}
            />
            )
        }
    </div>
    </div>
  )
}