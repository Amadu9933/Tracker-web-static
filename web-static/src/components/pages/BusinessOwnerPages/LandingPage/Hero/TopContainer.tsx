
const TopContainer: React.FC = () => {
  return (
    <div className="absolute w-[50.5%]">
      <div className="relative mt-24">
        <div className="bg-gray-300 opacity-25 w-full h-full absolute"></div>
        <div className="relative text-left py-20 pl-14">
          <p className="font-bold text-[2.5rem] text-secondary">
            Effortless parcel shipping made simple
          </p>
          <p className="text-base font-normal text-[#585858]">
            Streamline your shipping process, generates <br /> unique tracking
            IDs for your parcels. Say goodbye to logistics <br /> headaches and
            hello to efficiency.
          </p>

          <div className="my-5">
            <button className="bg-primary text-[#FF833C] border border-[#FF833C] rounded-lg font-medium text-[16px] px-4 py-2 hover:bg-[#FF833C] hover:text-white hover:border-[#FF833C] focus:bg-[#FF833C] focus:text-white focus:border-[#FF833C]">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopContainer;