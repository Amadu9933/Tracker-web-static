
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
    <div className="App ">

      <Header />

     
    </div>
  );
};

export default App;
