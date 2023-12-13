
import React from 'react';
import MyButton from '../buttons/Mybutton';
import './HeroDescription.css'




const HeroDescription: React.FC = () => {

    const handleClick = () => {
        console.log('Button clicked!');
      };
      
  return (
   <div className='container'>
        <h1>Track with confidence</h1>
        <p>Never loose sleep over your order. Unleash  the power of percision with Trackerr-Your personal hero</p>
        
        <MyButton
        onClick={handleClick}
        label="Get started"
        state="Primary"
        size="Small"
        background="#FF833C"
      />

   </div>
  );
};

export default HeroDescription;