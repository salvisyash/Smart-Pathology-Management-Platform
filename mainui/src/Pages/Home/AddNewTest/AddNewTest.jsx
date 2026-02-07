import { Col, Container, Row } from 'react-bootstrap';
import './AddNewTest.css';
import Footer from '../../Home/Footer/Footer.jsx';
import Header2 from '../../Home/Header2/Header2.jsx';
import React, { useState } from 'react';
import axios from "axios";
import { ipofserver } from '../../../global';
/*eslint-disable eqeqeq*/
/* eslint-disable */

const Appoinment = () => {

    const [inputField, setInputField] = useState({
        testname: '',
        testcost: '',
        testdescription: '',
        testvalues: '',
        actualvalues: '',
    })

    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setInputField((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function clearInput() {
        setInputField({
            testname: '',
            testcost: '',
            testdescription: '',
            testvalues: '',
            actualvalues: '',
        });
    }

    const submitButton = () => {
        if (inputField.testname == '' || inputField.testcost == '' || inputField.testdescription == '' || inputField.testvalues == '' || inputField.actualvalues == '') {
            alert("Please enter all details !")
        }
        else {
            if (inputField.testvalues.split(',').length != inputField.actualvalues.split(',').length) {
                alert("Test values and actual values length should be same !")
            }
            else {
                axios.post(ipofserver + 'addnewTest', {
                    testname: inputField.testname,
                    testcost: inputField.testcost,
                    testdescription: inputField.testdescription,
                    testvalues: inputField.testvalues,
                    actualvalues: inputField.actualvalues,
                })
                    .then(function (response) {
                        if (response.data == "success") {
                            alert("Test added sucessfully !")
                            clearInput()
                            // window.location.href = '/addnewtest'
                        }
                        else {
                            alert("Something wrong !")
                            clearInput()
                            // window.location.href = '/addnewtest'
                        }
                    })
                    .catch(function (error) {
                        return error;
                    });

            }
        }
    }

    return (
        <>
            <Header2 />
            <section className="appoinment-wrapper">
                <Container>
                    <Row>
                        <Col sm={12} md={12}>
                            <div className="section-title">
                                <h1 className="mt-5">Add New Test</h1>
                            </div>
                            <div className="appoinment-form">
                                <Col md={12} lg={12}>
                                    <input type="text" placeholder="Enter test name"
                                        name="testname" value={inputField.testname} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <Col md={12} lg={12}>
                                    <input type="number" placeholder="Enter test cost"
                                        name="testcost" value={inputField.testcost} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <Col md={12} lg={12}>
                                    <textarea cols="30" rows="5"
                                        name="testdescription" value={inputField.testdescription} onChange={inputsHandler}
                                        placeholder="Enter test description" className="placeholder-black inputclass"></textarea>
                                </Col>
                                <Col md={12} lg={12}>
                                    <input type="text" placeholder="Enter test values"
                                        name="testvalues" value={inputField.testvalues} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <Col md={12} lg={12}>
                                    <input type="text" placeholder="Enter actual values"
                                        name="actualvalues" value={inputField.actualvalues} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <button className="theme-btn btn-fill form-btn mt-5" onClick={submitButton}>Add test</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    );
};

export default Appoinment;