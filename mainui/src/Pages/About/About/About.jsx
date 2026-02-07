import React from 'react';
import AboutService from '../../../components/AboutService/AboutService';
import Content from '../AboutContent/AboutContent';
import Achivement from '../Achivement/Achivement';
import Banner from '../Banner/Banner';
import Dentist from '../ExpertDentist/Dentist';
import Footer from '../../Home/Footer/Footer.jsx';
import Header1 from '../../Home/Header1/Header1.jsx';
const About = () => {
    return (
        <>
         <Header1 />
          <Banner />
          <Content /> 
          <AboutService />
          <Dentist />
          <Achivement />
          
        
          <Footer/>
        </>
    );
};

export default About;