
import React from 'react';
import './App.css'
import './index.css'
import MyButton from './components/common/buttons/Mybutton';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import LastChild from './components/common/header/HeaderLastChild';
import Hero from './components/common/hero/Hero';
import CustomerSignUp from './components/pages/customerPages/customerAuthentication/CustomerSignUp';
import TrackingSection from './components/common/trackingSection/TrackingSection';

const App: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  

  return (
    <div className="App ">
      

      <Header />
      <LastChild />
      <Hero />
      <MyButton onClick={handleClick}
        label="Login"
        state="Secondary"
        size="Small"
        background="#FF833C"/>
        <CustomerSignUp/>
      <TrackingSection />
      <Footer />
    
    </div>
  );
};

export default App;
