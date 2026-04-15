import SecondaryButton from "@components/common/buttons/Mybutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Payment({showDialog}: any) {
    // const [amount, setAmount] = useState(0); // Default to 0.01 for testing
  const rate = 123.3;// Example exchange rate, you can fetch this from an API
  return (
    <div
      className='border w-[25rem] h-1/2 bg-white rounded-lg shadow-lg flex p-4 flex-col'
    >
    <div
      className='flex justify-between w-full'
    >
        <h2 className='text-lg'>Top Up Wallet</h2>
        <h2
          onClick={()=>showDialog(false)}
          className='text-red-500 cursor-pointer '
        >X</h2>
    </div>
    <h3 className='text-sm text-gray-800 mt-4 mb-10'>Enter the amount you'd like to add to your Trackerr wallet.</h3>
    <div
        className="flex justify-between w-full gap-4 mb-5"
    >
        <div>
            <h3 className='text-sm text-gray-800 mb-2 text-center'>Amount in (GHS)</h3>
            <div
                className="flex justify-center items-center border border-orange-300 rounded-md pl-2"
            >
                <h2
                className='text-sm text-gray-400'
                >
                    GH₵
                </h2>
                <input
                type='number'
                step='0.1'
                    placeholder='0.0'
                    // value={amount}
                    min={0.0}
                    // onChange={() => (x) => setAmount(x.target.value)}
                    // onBlur={(x) => alert(x.target.value)}
                    className='w-[100px] h-10 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-blue-500 text-left focus-outline-none focus:ring-0 focus:ring-0 focus:border-white text-center'
                />
            </div>
        </div>
        <span
        className='text-2xl text-gray-400 mt-6 justify-center items-center flex'
        >=</span>
        <div>
            <h3 className='text-sm text-gray-800 mb-2 text-center'>Equivalent in (NGN)</h3>
            <input
            type='number'
                placeholder='₦ 0.00'
                className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-orange-300'
            />
        </div>
    </div>
    <h3 
      className="text-center text-sm text-gray-500"
    >
        1 GHS ≈ {rate} NGN
    </h3>
    <div
        className="flex justify-center items-center mt-6 bg-orange-100 w-full rounded-lg h-100 p-4 mb-5 gap-2"    
    >
        <FontAwesomeIcon icon={faTriangleExclamation} style={{ fontSize: '1rem', color: '#FF833C' }} />
        <h3
            className="text-sm text-gray-500"
        >
            The total amount at checkout may vary slightly due to applicable taxes, processing fees, or exchange rate fluctuations.
        </h3>
    </div>
    <div className="w-full flex justify-center items-center">
        <SecondaryButton
            label="Proceed to Top Up"
            // color="red"
            background="#FF833C"
            onClick={() => {}}
        />
    </div>
    </div>
  )
}
