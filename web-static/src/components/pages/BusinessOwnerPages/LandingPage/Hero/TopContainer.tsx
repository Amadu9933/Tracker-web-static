
const TopContainer: React.FC = () => {
  return (
    <div className="absolute w-[50.5%]">
      <div className="relative mt-24">
        <div className="bg-gray-300 opacity-25 w-full h-full absolute"></div>
        <div className="relative text-left py-20 pl-14">
          <p className="font-bold text-[2.5rem] text-secondary">
            Effortless parcel shipping made simple
          </p>
          <p className="  text-[24px] font-normal text-[#585858]">
            Streamline your shipping process, generates <br /> unique tracking
            IDs for your parcels. Say goodbye to logistics  headaches and
            hello to efficiency.
          </p>

          <div className="my-5">
            <button className="bg-primary text-white border border-[#FF833C] rounded-lg font-medium text-[16px]  h-[48px] w-32 py-2 hover:bg-[#f8a677] hover:text-white hover:border-[#FF833C] focus:bg-[#FF833C] focus:text-white focus:border-[#FF833C]">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopContainer;