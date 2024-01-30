
import React from 'react';
import './MyQestionSection.css'


const  MyQestionSection: React.FC = () => {

    
    const handleClick = () => {
        console.log('Button clicked!');
      };
      
  return (


    <section className='question-section'>
        <h2> Have A Question ?  </h2>
        <p>Check out the FAQ section for already answered questions that will give you clarity or reach out to our contact centre via email: helptrackerr@gmail.com  or call 00235545 for  enquiry.</p>
        
        <MyButton
            onClick={handleClick}
            label="Ask me"
            state="Primary"
            size="Small"
            background="Black"
         />

        <img src={Telephone} alt="Telephone" className='Telephone'/>
        
    </section>
  )

};

export default MyQestionSection;
