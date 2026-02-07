import React from 'react';
import Dentist from '../../../components/Dentist/Dentist';
import Feature from '../../../components/Feature/Feature';
import Promo from '../Appoinment-promo/Promo';
import Banner from '../Banner/Banner';
import Gallery from '../Gallery/Gallery';
import Slick from '../Slick/Slick';
import Footer from '../Footer/Footer.jsx';
import Header1 from '../Header1/Header1.jsx';
const Main = () => {
    

    return (
        <>
          <Header1 />
           <Banner />
           <Feature />
           <Dentist />
           <Gallery />
           <Promo />
           <Slick />
           <Footer/>
        </>
    );
};

export default Main;