const LandingPage: React.FC = () => {
  return (
    <div className=" pl-10 md:pl-0  w-full inline-block  justify-center  items-center">
      <h1 className=" text-xl md:text-3xl text-center font-medium text-secondary my-5 md:my-16 ">
        Why choose us
      </h1>

      <div className=" w-full flex gap-5   flex-col md:flex-row justify-center md:justify-evenly ">
        {/* Boost Efficiency */}

        <div className="bg-slate-600 w-[305px] h-[180px] pt-[48px] pb-[24px] mr-0 md:mr-16 ml-6 px-[10px] rounded-[8px] text-center">
          <h1 className="font-medium text-lg text-white">Boost Efficiency</h1>
          <p className="text-[#B3C3CF] text-sm">
            Eliminate manual processes and speed up your parcel tracking with
            our automated solution.
          </p>
        </div>

        <div className="bg-slate-600 w-[305px] h-[180px] pt-[48px] ml-6  pb-[24px] mr-0 md:mr-16 rounded-[8px] px-[10px] text-center">
          <h1 className="font-medium text-lg text-white">
            Enhance Customer Experience
          </h1>
          <p className="text-[#B3C3CF] text-sm">
            Provide your customers with accurate, real-time tracking
            information, improving satisfaction.
          </p>
        </div>

        <div className="bg-slate-600 w-[305px] h-[180px] ml-6  pt-[48px] pb-[24px] rounded-[8px] px-[10px] text-center">
          <h1 className="font-medium text-lg text-white">
            Reliable Security
          </h1>
          <p className="text-[#B3C3CF] text-sm">
            Our system ensures the security of your tracking IDs, preventing
            unauthorized access and tampering.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
