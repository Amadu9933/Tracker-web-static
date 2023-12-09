
import React from 'react';
import './App.css'
import './index.css'
import MyButton from './components/common/buttons/AskMeButton';

import Header from './components/common/header/Header';



const App: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (

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
