import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { avatar } from '../guideSection/assets/index';

const YouCanTrustUs: React.FC = () => {
  return (
    <div className="bg-[#FFF8EF] flex justify-center items-center min-h-screen">
      <div className="w-[40%] text-center">
        <h2 className="text-3xl font-medium text-secondary pt-24 pb-7">
          You can trust us
        </h2>
        <p className="text-[#8E8A73] text-sm font-inter font-medium mb-16 ">
          Dont take our word for it. Hear from happy users who have used <br />
          Trackerr to transform their shipping experiennce.
        </p>

        <div className="border-2 border-[#8E9090] border-solid rounded-lg p-6 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center mb-8">
            <img
              src={avatar}
              alt="Avatar"
              className="rounded-full h-[100px] w-[100px]"
            />
          </div>
          <p className="text-sm font-normal text-secondary text-center">
            "I can't express enough how our business has transformed since I
            started using Trackerr. It's been a game-changer in every
            aspect. The seamless process of generating ID for my
            customers and connecting with dispatchers to deliver in
            real-time is on a 100%."
          </p>
        </div>
        <div className="flex justify-center py-12 items-center">
          <div className="border-b-2 border-b-primary pb-1  border-solid ">
            <a href="" className="text-primary  text-sm font-medium">
              View All
            </a>
            <ArrowForwardIcon
              sx={{
                color: '#FF833C',
                height: '20px',
                width: '30px',

                marginRight: '-12px',
                marginLeft: '8px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouCanTrustUs;
