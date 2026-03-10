import { Rocket } from "../guideSection/assets/index";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ReadyTo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-24 bg-primary flex w-full justify-between items-center relative overflow-hidden">

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full md:w-2/4 text-center md:text-left mx-10 md:ml-12 my-12"
      >
        <h2 className="text-xl md:text-5xl font-bold">
          Ready to revolutionize your shipping game?
        </h2>

        <p className="text-sm mt-4 mb-4">
          Trackerr has got you covered.
        </p>

        <motion.button
          onClick={() => navigate("/Login")}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-[#FF833C] border border-[#FF833C] rounded-lg font-medium text-[16px] px-[18px] py-[12px] hover:bg-[#d6d5d4] hover:text-white transition"
        >
          Get started
        </motion.button>
      </motion.div>

      {/* Rocket */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        viewport={{ once: true }}
        className="right-0 absolute text-right hidden md:block"
      >
        <img
          src={Rocket}
          alt="rocket"
          className="w-96 -mt-10 h-[357px]"
        />
      </motion.div>
    </section>
  );
};

export default ReadyTo;