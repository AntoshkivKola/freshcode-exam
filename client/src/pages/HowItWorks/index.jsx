import React from 'react';
import Header from '../../components/Header/Header';
import StartScreen from '../../components/HowItWorks/StartScreen';
import Services from '../../components/HowItWorks/Services';
import Features from '../../components/HowItWorks/Features';
import GetStarted from '../../components/HowItWorks/GetStarted';
import Footer from '../../components/Footer/Footer';


const HowItWorks = (props) => {
  return (
    <>
      <Header/>
      <StartScreen/>
      <Services/>
      <Features/>
      <GetStarted/>
      <Footer/>
    </>
  );
}

export default HowItWorks;
