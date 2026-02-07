import React from 'react';
import Appoinment from '../../../Pages/Home/Appoinment/Appoinment';
import Banner from '../Banner/Banner';
import ContactUs from '../ContactUs/ContactUs';
import Footer from '../../Home/Footer/Footer.jsx';
import Header1 from '../../Home/Header1/Header1.jsx';
const Contact = () => {
    return (
        <>
         <Header1 />
            <Banner />
            <ContactUs />
            <Appoinment />  
            <Footer/> 
        </>
    );
};

export default Contact;