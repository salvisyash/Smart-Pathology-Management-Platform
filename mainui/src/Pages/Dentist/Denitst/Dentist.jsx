import React from 'react';
import Appoinment from '../../../Pages/Home/Appoinment/Appoinment';
import Banner from '../Bannner/Banner';
import Details from '../Details/Details';
import Footer from '../../Home/Footer/Footer.jsx';
import Header1 from '../../Home/Header1/Header1.jsx';

const Dentist = () => {
    return (
        <>
            <Header1 />
            <Banner />
            <Details />
            <Appoinment />
            <Footer/> 
        </>
    );
};

export default Dentist;