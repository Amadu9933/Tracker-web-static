
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
import CardSection from './components/common/cards/CardSection';

const App: React.FC = () => {
  
  

  return (
    <div className="App ">
      

      <Header />
      <LastChild />
      <Hero />
<<<<<<< HEAD
      <MyButton onClick={handleClick}
        label="Login"
        state="Secondary"
        size="Small"
        background="#FF833C"/>
        <CustomerSignUp/>
=======
>>>>>>> 35bf7b6b42ba5e9e4b41895790c9b98904142ef3
      <TrackingSection />
      <CardSection/>
      <Footer />
    
    </div>
  );
};

export default App;
