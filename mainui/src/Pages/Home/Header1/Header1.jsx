
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../Images/logo.png';
import './Header.css';

const Header1 = () => {

    return (
        <div className="head-bg">
            <Navbar className="navbar" collapseOnSelect expand="lg">
                <Container className="container-head">
                    <Navbar.Brand href="/"><img src={logo} alt="logo" style={{ width: '60px', height: '60px' }} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" expand="lg"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                        <Link to="/main" className='list-item text-decoration-none'>Home</Link>
                            <Link to="/registerPatient1" className='list-item text-decoration-none'>Apply for Test</Link> 
                            <Link to="/generatereport1" className='list-item text-decoration-none'>Generate report</Link>   
                            <Link to="/login" type="button" className="list-item text-decoration-none">Logout</Link>         
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header1;