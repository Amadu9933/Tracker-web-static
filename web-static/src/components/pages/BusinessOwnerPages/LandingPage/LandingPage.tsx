import Hero from './Hero/Hero';
import Layout from './guideSection/Layout';
import HowItWorks from './HowItWorks/HowItWorks';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import ReadyTo from './ReadyTo/ReadyTo';
import YouCanTrustUs from './YouCanTrustUs/YouCanTrustUs';
import QuestionSection from '@components/myQuestionSection/MyQestionSection';

import Footer from '@common/footer/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="">
      <div className="  h-[750px] md:h-[650px] max-w-md mx-auto  text-white text-center  sm:p-3 md:p-4 lg:p-5  ">
        {' '}
        <Hero />
      </div>

      <Layout />

      <div className=" px-0 md:px-36 ">
        <HowItWorks />
        <WhyChooseUs />
      </div>
      <ReadyTo />
      <YouCanTrustUs />
      <div className=" py-24 px-10 md:px-24">
        {/* <MyQuestionSection /> */}
        <QuestionSection />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
