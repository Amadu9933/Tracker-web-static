import { Rocket } from '../guideSection/assets/index';

const ReadyTo: React.FC = () => {
  return (
    <div className="mt-24 bg-primary flex w-full justify-between items-center">
      <div className="w-2/4 text-left ml-12 my-12">
        <h2 className="text-5xl font-bold">
          Ready to revolutionize your shipping game?
        </h2>
        <p className="text-sm mt-4 mb-4">Trackerr has got you covered.</p>

        <button className="bg-white text-[#FF833C] border border-[#FF833C] rounded-lg font-medium text-[16px] px-[18px] py-[12px] hover:bg-[#d6d5d4] hover:text-white">
          Get started
        </button>
      </div>
      <div className="right-0 absolute text-right">
        <img src={Rocket} alt="" className="w-96 -mt-10 h-[357px]" />
      </div>
    </div>
  );
};

export default ReadyTo;