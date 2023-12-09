
import React from 'react';
import './App.css'
import MyButton from './components/common/buttons/AskMeButton';
import NavBar from "./components/common/global/NavBar"
import 'normalize.css';

const App: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="App">
      <NavBar/>
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
