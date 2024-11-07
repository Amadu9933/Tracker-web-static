const LandingPage: React.FC = () => {
  return (
    <div className="  w-full inline-block  justify-center items-center">
      <h1 className="text-3xl  text-secondary my-16 ">Why choose us</h1>

      <div className=" w-full flex justify-evenly ">
        {/* Boost Efficiency */}

        <div className="bg-slate-600 w-[320px] h-[150px] pt-[48px] pb-[24px] mr-16 px-[10px] rounded-[8px] ">
          <h1 className="font-medium text-sm text-white">Boost Efficiency</h1>
          <p className="text-[#B3C3CF] text-[12px]">
            Eliminate manual processes and speed up your parcel tracking with
            our automated solution.
          </p>
        </div>

        <div className="bg-slate-600 w-[320px] h-[150px] pt-[48px] pb-[24px] mr-16 rounded-[8px] px-[10px]">
          <h1 className="font-medium  text-sm text-white">
            Enhance Customer Experience
          </h1>
          <p className="text-[#B3C3CF] text-[12px] ">
            Provide your customers with accurate, real-time tracking
            information, improving satisfaction.
          </p>
        </div>

        <div className="bg-slate-600 w-[320px] h-[150px] pt-[48px] pb-[24px] rounded-[8px] px-[10px]">
          <h1 className="font-medium   text-sm text-white">
            Reliable Security
          </h1>
          <p className="text-[#B3C3CF]  text-[12px]">
            Our system ensures the security of your tracking IDs, preventing
            unauthorized access and tampering.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
