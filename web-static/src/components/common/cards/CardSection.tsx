// CenterContent.tsx
import React from 'react';
import './CardSection.css'


const CardSection: React.FC = () => {
  return (

    <section className='card-section'>
        <h2>How it works</h2>
        <div className='cards-container'>
            <div className='card'>
                <div className='number'>01</div>
                <div className='card-content'>
                    <p>Hello World</p>

                </div>
            </div>

            <div className='card'>
                <div className='number'>01</div>
                <div className='card-content'>
                    <p>Hello World</p>

                </div>
            </div>

            <div className='card'>
                <div className='number'>01</div>
                <div className='card-content'>
                    <p>Hello World</p>

                </div>
            </div>

        </div>
    </section>
  )

};

export default CardSection;
