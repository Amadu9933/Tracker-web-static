import axiosInstance from "../../api/axiosInstance";
import { useState } from "react";

export default function VerificationModal({ onVerify }: any) {
  const [phoneCode, setPhoneCode] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [verifying, setVerifying] = useState(false)
  const BASE_URL = import.meta.env.VITE_TRACKERR_HOST

  const isReadyToVerify = phoneCode.length === 4 && emailCode.length === 4;

  const handleSendCodePhone = async() => {
    
    // send code to the clients phone
    const res = axiosInstance.post(
        `${BASE_URL}/users/send-verification-code/`,
        {"channel": "phone"}
    )

    if ((await res).status === 200) {
        // setMsg('Could not send phone verification code!')
        setMsg("✅ Verification Code sent to Phone")
            setTimeout(() => {
                setMsg('')
            }, 3000)

    } else {
        setMsg('Could not send phone verification code!')
            setTimeout(() => {
                setMsg('')
            }, 3000)
    }
  }

    const handleSendCodeEmail = async() => {
    
    // send code to the clients phone
    const res = axiosInstance.post(
        `${BASE_URL}/users/send-verification-code/`,
        {"channel": "email"}
    )

    if ((await res).status === 200) {
        setMsg("✅ Verification Code sent to Email")
        setTimeout(() => {
            setMsg('')
        }, 3000)
        
    } else {
        setMsg('Could not send email verification code!')
        setTimeout(() => {
            setMsg('')
        }, 3000)
    }


  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-6">Verification</h2>

        {/* Phone Number Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              maxLength={4}
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
              placeholder="Enter 4-digit code"
              className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="button"
              className="bg-blue-600 text-white px-3 py-2 rounded bg-primary hover:bg-orange-400"
              onClick={handleSendCodePhone}
            >
              Send Code
            </button>
          </div>
        </div>

        {/* Email Address Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              maxLength={4}
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
              placeholder="Enter 4-digit code"
              className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="button"
              className=" text-white px-3 py-2 rounded bg-primary hover:bg-orange-400"
              onClick={handleSendCodeEmail}
            >
              Send Code
            </button>
          </div>
        </div>
        <div className="w-full mt-4">
            <p className="text-center text-green-500 font-semibold py-2 px-4 rounded-md shadow-sm">
                {msg}
            </p>
            <p className="text-center text-red-500 font-semibold py-2 px-4 rounded-md shadow-sm">
                {err}
            </p>
        </div>
        {/* Verify Button */}
       
          <button
            type="button"
            disabled={!isReadyToVerify}
            onClick={() => {setVerifying(true); onVerify( phoneCode, emailCode, setVerifying, setErr)}}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {verifying ? "Verifying...." : "Verify"}
          </button>

        {/* Close Button */}
        {/* <button
          type="button"
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 mt-2"
        >
          Close
        </button> */}
        
      </div>
    </div>
  );
}
