import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../Images/logo.png';
import './Header.css';

const Header = () => {

    return (
        <div className="head-bg">
            <Navbar className="navbar" collapseOnSelect expand="lg">
                <Container className="container-head">
                    <Navbar.Brand href="/home"><img src={logo} alt="logo" style={{ width: '60px', height: '60px' }} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" expand="lg"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">  
                            {/* <Link to="/contact" className='list-item text-decoration-none'>Appoinments</Link>                          */}
                            <Link to="/login" type="button" className="list-item text-decoration-none">Login</Link>
                            <Link to="/register" type="button" className="list-item text-decoration-none">Register</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;