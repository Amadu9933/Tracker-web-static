import { motion } from "framer-motion";


export default function TrackingNumberSearchBar({setSearch}: any) {
 
  

  return (
    <div className="w-full md:w-[70%] sm:w-[50%]">
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative"
    >
        {/* Search Icon */}
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
        />
        </svg>

        <input
        type="text"
        placeholder="Search tracking number..."
        onChange={(e)=>setSearch(e.target.value)}
        className="
            w-full
            h-11
            rounded-xl
            border
            border-gray-300
            bg-white
            pl-11
            pr-4
            text-sm
            text-gray-800
            placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base
            placeholder:text-gray-400/40
            shadow-sm
            transition-all
            duration-200

            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/20
            focus:border-blue-500

            dark:bg-[#0F172A]
            dark:border-gray-700
            dark:text-gray-100
            dark:placeholder:text-gray-500
            dark:focus:ring-blue-500/20
            dark:focus:border-blue-500
        "
        />
    </motion.div>
    </div>
  )
}
