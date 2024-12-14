import { howItWorks } from '../guideSection/assets/index';
const LandingPage: React.FC = () => {
  return (
    <div className=" ">
      <h1 className="text-3xl  text-secondary mt-16">How it works</h1>

      <div className="flex justify-between mt-20">
        <div>
          {' '}
          <img src={howItWorks} alt="" className="w-[380px] h-[380px]" />{' '}
        </div>

        <div className="w-[330px]  text-left ">
          {/* sign up */}
          <div className="py-[20px]">
            <h1 className="font-normal text-2xl flex  text-secondary">
              <div className="text-5xl -mt-6 mr-2">.</div> Step 1: Sign up/
              login
            </h1>
            <p className="text-[#8E8A73] text-sm text-left">
              Register to create account for your business by clicking the{' '}
              <span>‘Get started’</span> butto
            </p>
          </div>

          {/* Generate */}
          <div className="py-[20px] ">
            <h1 className="font-normal text-2xl flex  text-secondary">
              <div className="text-5xl -mt-6 mr-2">.</div> Step 2: Generate
              tracking IDs
            </h1>
            <p className="text-[#8E8A73] text-sm ">
              Enter parcel details and generate tracking I.D for your parcel.
              Generate unique tracking ids for your different products, activate
              them and send to your many customers.
            </p>
          </div>

          {/* Connect */}
          <div className="py-[20px] ">
            <h1 className="flex font-normal text-2xl   text-secondary">
              <div className="text-5xl -mt-6 mr-2">.</div> Step 3: Connect with
              logistics
            </h1>
            <p className="text-[#8E8A73] text-sm ">
              end your parcels on their way to your customers by connecting with
              logistics partners on our platform and enjoy real-time tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
