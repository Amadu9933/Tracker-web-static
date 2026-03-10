import { Footer, Mybutton } from "@components/common";
import parcelDrop from "./asset/Box.png";
import GearIcon from "@components/common/reusable/gearIcon";
import { useNavigate } from "react-router-dom";
import QuestionSection from "@components/myQuestionSection/MyQestionSection";
import logisticsImg from "/src/assets/logistics-image.png";
import { motion } from "framer-motion";

const LogisticSolution: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">

      {/* ── Hero Section ── */}
      <section
        className="w-full min-h-[60vh] md:h-[50.5rem] bg-cover bg-center bg-no-repeat flex flex-col px-6 sm:px-10 pt-32 md:pt-[252px] pb-16 md:pb-0 overflow-hidden relative"
        style={{ backgroundImage: `url(${logisticsImg})` }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="ml-5 text-center md:text-left">
          <div className="relative z-10 w-full max-w-[740px]">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 md:mb-10 font-bold text-3xl md:text-5xl  sm:text-4xl md:text-[64px] leading-tight md:leading-[72px] tracking-[-0.02em] text-white text-center md:text-left"
            >
              Do you own a bike or a logistics business?
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white mb-5 md:mb-10  sm:text-lg text-base md:text-lg"
            >
              <p>Earn more money and reach more business owners in</p>
              <p>need of your services by partnering with Trackerr</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Mybutton label="Get Started" background="primary" onClick={() => navigate("/sign-up")} />
            </motion.div>
          </div>

          {/* Dot grid */}
          <div className="hidden md:grid grid-cols-6 gap-[6px] opacity-70 absolute top-[13%]">
            {[...Array(42)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 bg-white rounded-full" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Optimize. Connect. Grow. ── */}
      <section className="py-12 md:py-20 px-6 sm:px-10">
        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-12 md:gap-6 relative">

          {/* Left: text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-[45%] flex flex-col justify-center text-center md:text-left"
          >
            <h3 className="font-lora font-medium text-xl sm:text-2xl md:text-[36px] leading-tight tracking-normal mb-6 md:mb-8">
              Optimize. Connect. Grow.
            </h3>
            <p className="font-poppins font-normal text-base sm:text-lg md:text-[32px] leading-relaxed md:leading-[48px] tracking-normal mb-6">
              Transform Your Logistics Workflow with Trackerr and connect you
              with business owners in need of logistics solutions.
            </p>
            <div>
              <button className="border border-primary text-primary w-32 p-2 rounded-[6px] text-sm md:text-base">
                Partner with us
              </button>
            </div>
          </motion.div>

          {/* Right: decorative grid + image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full md:w-[50%] h-[300px] sm:h-[400px] md:h-[500px] flex flex-col justify-center relative overflow-hidden rounded-xl"
          >
            <div className="flex w-full h-1/2">
              <div className="w-full h-full" />
              <div className="w-full h-full bg-[#9EB3FFF0]" />
            </div>
            <div className="flex w-full h-1/2">
              <div className="w-full h-full bg-[#9EB3FFF0]" />
              <div className="w-full h-full" />
            </div>
            <div className="absolute top-[0px] left-[30px] w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full bg-[#FFE393]" />
            <div className="absolute bottom-[1px] right-[15px] md:right-[30px] w-[140px] md:w-[200px] h-[24px] md:h-[32px] rounded-[50px] bg-[#FFD6BE]" />
            <img
              alt="two guys lifting a carton into a truck"
              src={parcelDrop}
              className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[88%] h-[80%] object-cover rounded-lg shadow-md"
            />
          </motion.div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="mb-20 md:mb-32 px-4 sm:px-6 md:px-10">
        <motion.h4
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-inter font-medium text-xl sm:text-2xl md:text-[32px] leading-tight text-[#354755] text-center mb-10 md:mb-28"
        >
          How it works
        </motion.h4>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-start w-full max-w-4xl mx-auto gap-10 md:gap-20">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden  md:flex flex-col justify-center"
          >

            <GearIcon />
          </motion.div>

          {/* Steps */}
          <div className="w-full max-w-[485px] space-y-2  pt-16 md:mt-0  ">

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <ul className="list-disc ml-6 sm:ml-8 text-[#354755] font-inter font-medium text-sm sm:text-base md:text-[24px] leading-[36px]">
                <li >Step 1: Sign up / login</li>
              </ul>
              <p className="font-inter md:mt-4 font-normal text-xs sm:text-sm md:text-[16px] leading-[24px] text-[#8E8A73] mb-6 ml-1">
                Register to create account for your dispatch service by clicking
                the <span className="text-[#354755]">'Get started'</span> button
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <ul className="list-disc ml-6 sm:ml-8 text-[#354755] font-inter font-medium text-sm sm:text-base md:text-[24px] leading-[36px]">
                <li>Step 2: Account set up</li>
              </ul>
              <p className="font-inter md:mt-4 font-normal text-xs sm:text-sm md:text-[16px] leading-[24px] text-[#8E8A73] mb-6 ml-1">
                Fill out your profile with details about your logistics capabilities
                and areas of operation. Verify your company details through our
                secure process to start connecting with businesses.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <ul className="list-disc ml-6 sm:ml-8 text-[#354755] font-inter font-medium text-sm sm:text-base md:text-[24px] leading-[36px]">
                <li>Step 3: Connect and grow</li>
              </ul>
              <p className="font-inter md:mt-4 font-normal text-xs sm:text-sm md:text-[16px] leading-[24px] text-[#8E8A73] mb-6 ml-1">
                Once your account is set up, you'll start getting matched with
                businesses looking for logistics partners.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      <QuestionSection />
      <Footer />
    </div>
  );
};

export default LogisticSolution;