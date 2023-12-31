
import React from 'react';
import MyButton from '../buttons/Mybutton';
import './Footer.css'


const handleClick = () => {
    console.log('Button clicked!');
  };

const Footer: React.FC = () => {
  return (
   <div className='container'>
   <footer className='bg-gray-600'>
     <div className='firt-item item'>
        <h2 >Join To Get Started</h2> 
        
         <p>Your Parcel's journey your way. </p>
     <MyButton
        onClick={handleClick}
        label="Get started"
        state="Primary"
        size="Small"
        background="#FF833C"
      />
       
      
     </div>

     <div className='second-item item'>
        <h1>Company</h1>
        <p>How it works</p>
        <p>Career</p>
        <p>Legal</p>
     </div>

     <div className='third-iem item'>
        <h1>Help</h1>
        <p>Privacy Policy</p>
        <p>Refund Policy</p>
        <p>Track Your Order</p>
        </div>
     <div className='fourth-item item'>
        <h1>Support</h1>
        <p>Feedback</p>
        <p>Contact Us</p>
        <p>Customer Service</p>
        <p>Terms & condition</p>
        </div>
     
   </footer>
   <p className='copy-right'>Trackerr &copy; 2023. All rights reserved</p>
   </div>
  );
};

export default Footer;
