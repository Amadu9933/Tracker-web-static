
import React from 'react';
import './App.css'
import './index.css'
import MyButton from './components/common/buttons/Mybutton';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import LastChild from './components/common/header/HeaderLastChild';


const App: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="App ">
      

      <Header />
      <LastChild />
      <Footer />
    

     
    </div>
  );
};

export default App;
