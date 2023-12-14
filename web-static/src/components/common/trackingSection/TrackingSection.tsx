// Navbar.tsx
import React from 'react';
import './TrackingSection.css'
import logo from '../../../assets/carbon_delivery-parcel.png'



const TrackingSection: React.FC = () => {
  return (
        <section className='track-section'>
            <div className='track-container'>
            
                <img src={logo} alt="Logo" className="logo" />
                <h2>Parcel Tracking</h2>
                <div className='enter-tracking'>
                    <p>Enter Tracking I.D</p>
                    <p>My Parcels</p>
                </div>
                <input className='input' type="text" />

            </div>
        </section>
  );
};

export default TrackingSection;
