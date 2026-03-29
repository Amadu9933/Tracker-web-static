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
    <div className="bg-white dark:bg-[#0b111f] transition-colors duration-300">
      <div className="w-full min-h-[750px]">
        {' '}
        <Hero />
      </div>

      <Layout />

      <div className="px-0 md:px-36">
        <HowItWorks />
        <WhyChooseUs />
      </div>
      <ReadyTo />
      <YouCanTrustUs />
      <div className="py-24 px-10 md:px-24 bg-white dark:bg-[#0b111f] transition-colors duration-300">
        {/* <MyQuestionSection /> */}
        <QuestionSection />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
