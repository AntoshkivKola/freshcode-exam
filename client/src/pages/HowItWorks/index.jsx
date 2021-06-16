import React from 'react';
import Header from '../../components/Header/Header';
import StartScreen from '../../components/HowItWorks/StartScreen';
import Services from '../../components/HowItWorks/Services';
import Footer from '../../components/Footer/Footer';


const HowItWorks = (props) => {
  return (
    <>
      <Header/>
      <StartScreen/>
      <Services/>
      <Footer/>
    </>
  );
}

export default HowItWorks;
