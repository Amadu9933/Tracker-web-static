// Navbar.tsx
import React from 'react';
import './TrackingSection.css'
import logo from '../../../assets/carbon_delivery-parcel.png'
import search from '../../../assets/Vector.png'



const TrackingSection: React.FC = () => {
  return (
        <section className='track-section'>
            <div className='track-container'>
            
                <img src={logo} alt="Logo" className="carbon-delivery" />
                <h2 >Parcel Tracking</h2>
                <div className='enter-tracking'>
                    <p>Enter Tracking I.D</p>
                    <p className='my-parcels'>My Parcels</p>
                </div>
                <div className="search-container">
                <input type="text" placeholder='Text' />
                <i className="search-icon"></i>
                </div>

            </div>
        </section>
  );
};

export default TrackingSection;
