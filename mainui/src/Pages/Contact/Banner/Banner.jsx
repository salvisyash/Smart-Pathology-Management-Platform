import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import HeroMainbg from '../../../Images/as.png';
const Banner = () => {
    return (
        <section className="banner-all text-white">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} lg={6} sm={12}>
                        <div className="section-title">
                            <h1>Appoinment Form</h1>
                        </div>
                        <div className="breadcrumb-nav">
                            <a href="/" className="text-decoration-none text-white">Appoinment Page</a>
                            <span href="/" className="text-decoration-none text-white ml-2">Appoinment Us</span>
                        </div>
                    </Col>
                    <Col md={6} lg={6} sm={12}>
                        <div className="hero-slide-right text-start">
                            <div className="banner-animate">
                                <img src={HeroMainbg} alt="" className="img-fluid" />
                                

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Banner;