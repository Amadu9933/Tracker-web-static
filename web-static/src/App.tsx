<<<<<<< HEAD

import React from 'react';
import './App.css'
import './index.css'
import MyButton from './components/common/buttons/Mybutton';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import LastChild from './components/common/header/HeaderLastChild';
import Hero from './components/common/hero/Hero';
import ForgetPassword from './components/pages/customerPages/customerAuthentication/ForgetPassword';
import CustomerSignUp from './components/pages/customerPages/customerAuthentication/CustomerSignUp';
import TrackingSection from './components/common/trackingSection/TrackingSection';
import CardSection from './components/common/cards/CardSection';
=======
import React from "react";
import "./App.css";
import "./index.css";
import CustomerLandingPage from "./components/pages/customerPages/CustomerLandingPage";
import CustomerTrackingDetailLayout from "./components/pages/customerPages/CustomerTrackingDetails/CustomerTrackingDetailLayout";
>>>>>>> 5ecf52f2525662839bf56124f94a75d0fdb97853

const App: React.FC = () => {
	return (
		<div className="App ">
			{/* Landing page */}

<<<<<<< HEAD
  return (
    <div className="App ">
      

      <Header />
      <LastChild />
      <Hero />
      <CustomerSignUp/>
      <ForgetPassword/>
      <TrackingSection />
      <CardSection/>
      <Footer />
    
    </div>
  );
=======
			<CustomerLandingPage />
			<CustomerTrackingDetailLayout />
		</div>
	);
>>>>>>> 5ecf52f2525662839bf56124f94a75d0fdb97853
};

export default App;
