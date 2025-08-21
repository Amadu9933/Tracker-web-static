import '../../../App.css';
import '../../../index.css';

import { Hero, Track, Footer } from '../../common/commons';

import DidYouKnow from '../../pages/customerPages/CustomerDidYouKnow';
import  QuestionSection from '../../myQuestionSection/MyQestionSection';
import "../logisticOwnerPage/landingPage/landingPage.css"

const CustomerLandingPage: React.FC = () => {
  return (
    <div>
      <header>
        {/* Navigationtiiion bar component */}

        <Hero />
        <Track />
      </header>
      <main>
        <DidYouKnow />
        <div className="md:mt-56 md:mb-60 mt-16 mb-16">
          {/* <MyQuestionSection /> */}
          <QuestionSection />
        </div>
      </main>

      <Footer />
    </div>
  );

};
export default CustomerLandingPage;
