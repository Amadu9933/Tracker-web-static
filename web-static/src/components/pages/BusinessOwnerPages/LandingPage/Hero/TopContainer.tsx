import { useNavigate } from "react-router-dom";
import trackingMan from './trackingMan.png'
import { motion } from "framer-motion";

const TopContainer: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className="  absolute w-full  md:w-[50.5%] " >
      <div className="relative mt-0 md:mt-24">
        <div className="bg-gray-300 opacity-25 w-full h-full absolute">   </div>
        <div className="relative text-center md:text-left py-20 pl-0 md:pl-14">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-bold text-3xl md:text-5xl text-secondary leading-tight"
          >
            Effortless parcel shipping made simple
          </motion.h1>
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed"
          >
            Streamline your shipping process and generate unique tracking
            IDs for your parcels. Say goodbye to logistics headaches and
            hello to efficiency.
          </motion.p>

          <div className="my-5 mt-6 md:mt-10">
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <button
                onClick={() => navigate("/login")}
                className="w-[200px] md:w-48 h-12 bg-primary text-white rounded-lg font-semibold shadow-md hover:bg-[#f8a677] transition"
              >
                Get Started
              </button>
            </motion.div>
          </div>
          <div>
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center md:justify-start mt-12 md:hidden "
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                className="
      p-[3px]
      rounded-2xl
      bg-gradient-to-r
      from-orange-400
      via-pink-500
      to-purple-500
      shadow-xl
    "
              >
                <img
                  src={trackingMan}
                  alt="man  tracking parcel on mobile"
                  loading="lazy"
                  className="w-64  h-60  rounded-2xl bg-white"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopContainer;