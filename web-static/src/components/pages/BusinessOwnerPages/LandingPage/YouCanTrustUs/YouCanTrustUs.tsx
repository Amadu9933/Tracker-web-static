import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { avatar } from "../guideSection/assets/index";
import { motion } from "framer-motion";

const YouCanTrustUs: React.FC = () => {
  return (
    <div className="bg-[#FFF8EF] dark:bg-[#0d1526] flex justify-center items-center py-16 px-4 md:px-8 transition-colors duration-300">
      <div className="w-full max-w-3xl text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-medium text-secondary dark:text-white pt-10 md:pt-16 pb-5"
        >
          You can trust us
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[#8E8A73] dark:text-slate-400 text-sm md:text-base font-inter font-medium mb-10 md:mb-14"
        >
          Dont take our word for it. Hear from happy users who have used
          Trackerr to transform their shipping experience.
        </motion.p>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="border-2 border-[#8E9090] dark:border-slate-600 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center bg-white dark:bg-slate-800 shadow-sm dark:shadow-lg transition-colors duration-300"
        >
          <div className="flex justify-center items-center mb-6">
            <img
              src={avatar}
              alt="Avatar"
              className="rounded-full h-[80px] w-[80px] md:h-[100px] md:w-[100px]"
            />
          </div>

          <p className="text-sm md:text-base font-normal text-secondary dark:text-slate-300 text-center leading-relaxed">
            "I can't express enough how our business has transformed since I
            started using Trackerr. It's been a game-changer in every
            aspect. The seamless process of generating IDs for my
            customers and connecting with dispatchers to deliver in
            real-time is on a 100%."
          </p>
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center py-10 items-center"
        >
          <motion.div
            whileHover={{ x: 5 }}
            className="border-b-2 border-b-primary dark:border-b-orange-500 pb-1"
          >
            <a href="" className="text-primary dark:text-orange-500 text-sm font-medium">
              View All
            </a>

            <ArrowForwardIcon
              sx={{
                color: "#FF833C",
                height: "20px",
                width: "30px",
                marginRight: "-12px",
                marginLeft: "8px",
              }}
            />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default YouCanTrustUs;