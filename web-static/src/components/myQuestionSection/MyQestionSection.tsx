import Robot from '@components/common/reusable/robot';
import { motion } from "framer-motion";

const QuestionSection = () => {
  return (
    <section className="py-10 md:px-5 sm:px-8 md:py-14 lg:py-16 ">
      <div className="mx-auto max-w-6xl">

        <div className="flex items-center justify-center md:flex-row flex-col gap-10 text-center md:text-center">

          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h2 className="font-medium text-3xl sm:text-4xl md:text-[32px] leading-tight tracking-normal mb-4 text-secondary">
              Have A Question ?
            </h2>

            <p className="font-poppins font-normal text-lg sm:text-xl md:text-[20px] leading-relaxed md:leading-[36px] tracking-normal text-[#585858] mb-6">
              Check out the FAQ section for already answered questions that will give you clarity or reach out to our contact centre via email:
              <span className="text-primary"> helptrackerr@gmail.com </span>
              or call 00235545 for enquiry.
            </p>
          </motion.div>

          {/* Robot */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.1 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <Robot className="w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default QuestionSection;