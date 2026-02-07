import React from 'react';
import Banner from '../Banner/Banner';
import Detail from '../Detail/Detail';
import Safety from '../Safety/Safety';
import Footer from '../../Home/Footer/Footer.jsx';
import Header1 from '../../Home/Header1/Header1.jsx';
const Service = () => {
    return (
        <>
         <Header1 />
          <Banner /> 
          <Detail />
          <Safety />
         
          <Footer/>
        </>
    );
};

export default Service;