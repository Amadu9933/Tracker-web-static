// CenterContent.tsx
import React from 'react';
import './CardSection.css';
import MyButton from '../buttons/Mybutton';
import OrderArrow from '../../../assets/Order-Arrow.png';

const CardSection: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <section className="card-section">
      <h2>How it works</h2>
      <div className="cards-container">
        <div className="card">
          <img src={OrderArrow} alt="OrderArrow" className="OrderArrow" />
          <div className="number">01</div>
          <div className="card-content">
            <h2>Create Account</h2>
            <p>Register to create Account</p>
            <MyButton
              onClick={handleClick}
              label="Get started"
              state="Primary"
              size="Medium"
              background="#FFEADF"
            />
          </div>
        </div>

        <div className="card">
          <img src={OrderArrow} alt="OrderArrow" className="OrderArrow" />
          <div className="number">02</div>
          <div className="card-content">
            <h2>Search I.D</h2>
            <p>
              Enter your parcel tracking number, the current status will be
              displayed in the package tracking system.{' '}
            </p>
          </div>
        </div>

        <div className="card">
          <div className="number">03</div>
          <div className="card-content">
            <h2>Report & Notification</h2>
            <p>
              You will also receive important and detailed information about
              your parcel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection;
