import Hero from './Hero/Hero';
import Layout from './guideSection/Layout';
import HowItWorks from './HowItWorks/HowItWorks';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import ReadyTo from './ReadyTo/ReadyTo';
import YouCanTrustUs from './YouCanTrustUs/YouCanTrustUs';
import MyQuestionSection from '@components/myQuestionSection/MyQestionSection';
import Footer from '@common/footer/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="">
      <div className="h-[650px]">
        {' '}
        <Hero />
      </div>

      <Layout />

      <div className="px-36 ">
        <HowItWorks />
        <WhyChooseUs />
      </div>
      <ReadyTo />
      <YouCanTrustUs />
      <div className="py-24 px-24">
        <MyQuestionSection />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
