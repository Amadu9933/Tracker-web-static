import { instantTrackig, setting, seemless } from './assets/index';
const Boxes: React.FC = () => {
  return (
    <div className="flex justify-around items-center flex-col md:flex-row">
      <div className="mt-10   ml-10">
        <img src={instantTrackig} alt="" className="w-[60px] h-[65px] ml-[35%] md:ml-0" />
        <h1 className="text-center md:text-left my-4 text-2xl font-medium text-secondary ">
          Instant Tracking IDs
        </h1>
        <p className="text-left text-[#8E8A73] mr-5">
          Generate unique IDs in seconds, ensuring real-time visibility for your
          parcels.
        </p>
      </div>
      <div className="ml-10">
        <img src={setting} alt="" className="w-[60px] h-[65px] ml-[35%] md:ml-0" />
        <h1 className="text-center md:text-left text-2xl my-4 font-medium text-secondary ">
          Customization Options:
        </h1>
        <p className="text-left text-[#8E8A73]">
          Tailor tracking IDs to your preferences, making them easily
          recognizable and brand-specific.
        </p>
      </div>
      <div className="ml-10">
        <img src={seemless} alt="" className="w-[80px] h-[65px] ml-[35%] md:ml-0" />
        <h1 className="text-center md:text-left  text-2xl my-4 font-medium text-secondary">
          Seamless Integration:
        </h1>
        <p className="text-left text-[#8E8A73] pb-10">
          Tailor tracking IDs to your preferences, making them easily
          recognizable and brand-specific.s
        </p>
      </div>
    </div>
  );
};

export default Boxes;
