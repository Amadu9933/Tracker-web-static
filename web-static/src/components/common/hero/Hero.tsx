
import React from 'react';
import MyButton from '../buttons/Mybutton';
import './Hero.css'
import first from '../../../assets/first-image.png'
import second from '../../../assets/second-image.png'
import third from '../../../assets/third-image.png'
import fourth from '../../../assets/fourth-image.png'




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
   <img src={first} alt="first" className="first" />
   <img src={second} alt="second" className="second" />
   <img src={third} alt="second" className="third" />
   <img src={fourth} alt="fourth" className="fourth" />
   
   </div>

   </div>
  );
};

export default Hero;
