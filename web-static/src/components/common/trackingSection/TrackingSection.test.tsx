// Navbar.tsx
import React from 'react';
import './TrackingSection.css'



const TrackingSection: React.FC = () => {
  return (
        <section>
            <div className='track-container'>
                <img src="" alt="" />
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
