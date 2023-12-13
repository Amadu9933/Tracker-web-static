
import React from 'react';
import MyButton from '../buttons/Mybutton';
import './Hero.css'




const Hero: React.FC = () => {

    const handleClick = () => {
        console.log('Button clicked!');
      };
      

  return (
   <div className='hero'>
    <div className='description-item item'>
        <h2>Track with confidence</h2>
        <p>Never loose sleep over your order. Unleash  the </p>
        <p className='lp'>power of percision with Trackerr-Your personal heros</p>
        
        <MyButton
        onClick={handleClick}
        label="Get started"
        state="Primary"
        size="Small"
        background="#FF833C"
      />

   </div>

   <div className='image-item item'>
   
   
   </div>

   </div>
  );
};

export default Hero;
