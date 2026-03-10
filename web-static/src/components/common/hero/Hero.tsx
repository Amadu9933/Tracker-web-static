import './Hero.css';
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <div className="hero pt-10 md:pt-40 pb-28 ">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-white font-bold text-5xl md:font-extrabold md:text-8xl text-center md:text-center mx-6 md:mx-72"
      >
        Track your <br />
        parcel today!
      </motion.h1>
      <motion.h4
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white text-[12px] md:text-lg text-center md:text-center mt-3 md:mt-9 mx-8 px-0 md:mx-80"
      >
        Get real-time location of your parcel from the comfort <br /> of your
        home with trackerr.
      </motion.h4>
    </div>
  );
};

export default Hero;