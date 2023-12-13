
import React from 'react';
import './App.css'
import './index.css'
<<<<<<< HEAD
import MyButton from './components/common/buttons/AskMeButton';

=======
import MyButton from './components/common/buttons/Mybutton';
>>>>>>> 02336e40be6e26c373e23b697530b684779941af
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import LastChild from './components/common/header/HeaderLastChild';



const App: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
<<<<<<< HEAD
=======
    <div className="App ">
      

      <Header />
      <LastChild />
      <Footer />
    
>>>>>>> 02336e40be6e26c373e23b697530b684779941af

    <div className="App">
     
      <Header/>
      <MyButton
        onClick={handleClick}
        label="Primary button"
        state="Primary"
        size="Small"
        background="#FF833C"
      />
      
      

    </div>
  );
};

export default App;
