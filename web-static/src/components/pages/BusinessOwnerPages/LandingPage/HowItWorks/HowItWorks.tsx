import { Processing } from "../guideSection/assets/index";
import { motion } from "framer-motion";

const LandingPage: React.FC = () => {
  return (
    <div className="px-4 md:px-10 bg-white dark:bg-[#0b111f] transition-colors duration-300">

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-xl md:text-3xl text-secondary dark:text-white mt-10 md:mt-16 text-center"
      >
        How it works
      </motion.h1>

      <div className="flex justify-between flex-col md:flex-row items-center mt-10 md:mt-20">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="hidden md:block md:mx-20"
        >
          <img
            src={Processing}
            alt="Processing illustration"
            className="w-[400px] h-[400px]"
          />
        </motion.div>

        {/* Steps */}
        <div className="w-[330px] text-left">

          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="py-[20px]"
          >
            <h1 className="font-normal text-2xl flex text-secondary dark:text-white">
              <div className="text-5xl -mt-6 mr-2">.</div>
              Step 1: Sign up / login
            </h1>

            <p className="text-[#8E8A73] dark:text-slate-400 text-sm text-left">
              Register to create an account for your business by clicking the
              <span> ‘Get started’ </span> button.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="py-[20px]"
          >
            <h1 className="font-normal text-2xl flex text-secondary dark:text-white">
              <div className="text-5xl -mt-6 mr-2">.</div>
              Step 2: Generate tracking IDs
            </h1>

            <p className="text-[#8E8A73] dark:text-slate-400 text-sm">
              Enter parcel details and generate tracking IDs for your parcels.
              Send these unique IDs to your customers to track their deliveries.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="py-[20px]"
          >
            <h1 className="flex font-normal text-2xl text-secondary dark:text-white">
              <div className="text-5xl -mt-6 mr-2">.</div>
              Step 3: Connect with logistics
            </h1>

            <p className="text-[#8E8A73] dark:text-slate-400 text-sm">
              Send parcels to your customers by connecting with logistics
              partners on our platform and enjoy real-time tracking.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;