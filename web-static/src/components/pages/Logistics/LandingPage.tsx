import { Footer, Mybutton, } from "@components/common";
import parcelDrop from "./asset/Box.png";
import { SecondaryButton } from "@components/common/buttons/Mybutton";
import GearIcon from "@components/common/reusable/gearIcon";
import { useNavigate } from "react-router-dom";
import QuestionSection from "@components/myQuestionSection/MyQestionSection";
import logisticsImg from "/src/assets/logistics-image.png";

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
          <div className="relative z-10 w-full max-w-[740px] ">
            <h1 className="mb-5 md:mb-10 font-bold text-[24px] text-center md:text-left sm:text-[48px] md:text-[64px] leading-tight md:leading-[72px] tracking-[-0.02em] text-white">
              Do you own a bike or a logistics business?
            </h1>
            <div className="text-white mb-5  md:mb-10  sm:text-[24px] text-[12px] md:text-[24px] ">
              <p>Earn more money and reach more business owners in </p>
              <p>need of your services by partnering with Trackerr</p>

            </div>
            <Mybutton label="Get Started" background="primary" onClick={() => navigate("/sign-up")} />
          </div>

          {/* Dot grid — hidden on small screens */}
          <div className="hidden md:grid grid-cols-6 gap-[6px] opacity-70 absolute top-[13%] ">
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
          <div className="w-full md:w-[45%] flex flex-col justify-center text-center md:text-left">
            <h3 className="font-lora font-medium text-2xl sm:text-3xl md:text-[36px]  leading-tight tracking-normal mb-8">
              Optimize. Connect. Grow.
            </h3>
            <p className="font-poppins font-normal text-lg sm:text-xl md:text-[32px]  leading-relaxed md:leading-[48px] tracking-normal  mb-6">
              Transform Your Logistics Workflow with Trackerr and connect you
              with business owners in need of logistics solutions.
            </p>
            <div>
              <button className="border border-primary text-primary w-32 p-2 rounded-sm"> Partner with us</button>
            </div>

          </div>

          {/* Right: decorative grid + image */}
          <div className="  w-full md:w-[50%] h-[300px] sm:h-[400px] md:h-[500px] flex flex-col justify-center relative overflow-hidden rounded-xl">

            {/* 2×2 colour block grid */}
            <div className="flex w-full h-1/2">
              <div className="w-full h-full" />
              <div className="w-full h-full bg-[#9EB3FFF0]" />
            </div>
            <div className="flex w-full h-1/2">
              <div className="w-full h-full bg-[#9EB3FFF0]" />
              <div className="w-full h-full" />
            </div>

            {/* Yellow circle accent */}
            <div className="absolute  top-[0px] left-[30px] w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full bg-[#FFE393]" />

            {/* Peach pill accent */}
            <div className="absolute bottom-[1px]  right-[15px] md:right-[30px] w-[140px] md:w-[200px] h-[24px] md:h-[32px] rounded-[50px] bg-[#FFD6BE]" />

            {/* Photo */}
            <img
              alt="two guys lifting a carton into a truck"
              src={parcelDrop}
              className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[88%] h-[80%] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="mb-20 md:mb-32 px-6 sm:px-10">
        <h4 className="font-inter font-medium text-2xl sm:text-3xl md:text-[32px] leading-[40px] text-[#354755] text-center mb-12 md:mb-28">
          How it works
        </h4>

        <div className="  flex flex-col md:flex-row justify-center items-center md:items-start w-full max-w-4xl mx-auto gap-10 md:gap-20">

          {/* Gear icon — hidden on mobile, shown on md+ */}
          <div className="hidden md:flex flex-col justify-center ">
            <GearIcon />
          </div>

          {/* Steps */}
          <div className="w-full max-w-[485px]">

            <ul className="list-disc ml-8 text-[#354755] font-inter font-medium text-lg md:text-[24px] leading-[36px]">
              <li>Step 1: Sign up/ login</li>
            </ul>
            <p className="font-inter font-normal text-sm md:text-[16px] leading-[24px] text-[#8E8A73] mb-6 ml-1">
              Register to create account for your dispatch service by clicking
              the <span className="text-[#354755]">'Get started'</span> button
            </p>

            <ul className="list-disc ml-8 text-[#354755] font-inter font-medium text-lg md:text-[24px] leading-[36px]">
              <li>Step 2: Account set up</li>
            </ul>
            <p className="font-inter font-normal text-sm md:text-[16px] leading-[24px] text-[#8E8A73] mb-6 ml-1">
              Fill out your profile with details about your logistics capabilities
              and areas of operation. Verify your company details through our
              secure process to start connecting with businesses.
            </p>

            <ul className="list-disc ml-8 text-[#354755] font-inter font-medium text-lg md:text-[24px] leading-[36px]">
              <li>Step 3: Connect and grow</li>
            </ul>
            <p className="font-inter font-normal text-sm md:text-[16px] leading-[24px] text-[#8E8A73] mb-6 ml-1">
              Once your account is set up, you'll start getting matched with
              businesses looking for logistics partners.
            </p>

          </div>
        </div>
      </section>

      <QuestionSection />

      <Footer />
    </div>
  );
};

export default LogisticSolution;