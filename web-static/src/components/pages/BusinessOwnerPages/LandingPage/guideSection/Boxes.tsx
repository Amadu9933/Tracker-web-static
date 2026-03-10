import { instantTrackig, setting, seemless } from "./assets/index";
import { motion } from "framer-motion";

const Boxes: React.FC = () => {
  return (
    <div className="flex justify-around items-center flex-col md:flex-row px-6 md:px-16">

      {/* Box 1 */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        className="mt-10 md:mt-0 md:max-w-[300px]"
      >
        <img
          src={instantTrackig}
          alt="Instant tracking"
          className="w-[60px] h-[65px] mx-auto md:mx-0"
        />

        <h1 className="text-center md:text-left my-4 text-2xl font-medium text-secondary">
          Instant Tracking IDs
        </h1>

        <p className="text-center md:text-left text-[#8E8A73]">
          Generate unique IDs in seconds, ensuring real-time visibility for your
          parcels.
        </p>
      </motion.div>

      {/* Box 2 */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        className="mt-10 md:mt-0 md:max-w-[300px]"
      >
        <img
          src={setting}
          alt="Customization"
          className="w-[60px] h-[65px] mx-auto md:mx-0"
        />

        <h1 className="text-center md:text-left text-2xl my-4 font-medium text-secondary">
          Customization Options
        </h1>

        <p className="text-center md:text-left text-[#8E8A73]">
          Tailor tracking IDs to your preferences, making them easily
          recognizable and brand-specific.
        </p>
      </motion.div>

      {/* Box 3 */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        className="mt-10 md:mt-0 md:max-w-[300px]"
      >
        <img
          src={seemless}
          alt="Integration"
          className="w-[80px] h-[65px] mx-auto md:mx-0"
        />

        <h1 className="text-center md:text-left text-2xl my-4 font-medium text-secondary">
          Seamless Integration
        </h1>

        <p className="text-center md:text-left text-[#8E8A73] pb-10">
          Connect easily with logistics platforms and manage deliveries
          efficiently.
        </p>
      </motion.div>
    </div>
  );
};

export default Boxes;