import { Col, Container, Row } from 'react-bootstrap';
import './BillPayment.css';
import Footer from '../Footer/Footer.jsx';
import Header2 from '../Header2/Header2.jsx';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ipofserver } from '../../../global';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
/*eslint-disable eqeqeq*/
/* eslint-disable */

const BillPayment = () => {

    const [userData, setUserData] = useState([])
    const [mainlist, setMainlist] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = event => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const getData = () => {
        axios.get(ipofserver + 'loadPatientTests')
            .then(res => {
                // console.log(res.data)
                setUserData(res.data)
                setMainlist(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const [inputField, setInputField] = useState({
        patientname: '',
        contactnumber: '',
        amountpaid: '',
        balance: '',

    })

    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setInputField((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const acceptButton = (a, b, c, d) => {
        setInputField({
            patientname: a,
            contactnumber: b,
            amountpaid: c,
            balance: d,
        });
        handleShow();
    }

    const submitButton = () => {

        if (inputField.patientname == '' || inputField.contactnumber == '' || inputField.amountpaid == '' || inputField.balance == '') {
            alert("Please enter all details !")
        }
        else {
            axios.post(ipofserver + 'updateBill', {
                patientname: inputField.patientname,
                contactnumber: inputField.contactnumber,
                amountpaid: inputField.amountpaid,
                balance: inputField.balance,
            })
                .then(function (response) {
                    handleClose()
                    if (response.data == "success") {
                        alert("Bill paid !")
                        getData();
                    }
                    else {
                        alert("Something went wrong !")
                    }
                })
                .catch(function (error) {
                    return error;
                });
        }
    }

    // const downloadButton = (pdfpath) => {
    //     // alert(pdfpath.split('/')[pdfpath.split('/').length-1]);
    // }

    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
        const text = e.target.value;
        setSearchInput(text);
        const userData = [...mainlist];
        console.log(userData);
        const filteredLst = userData.filter((userdetail) => {
            // You can modify this condition to match your search criteria
            return userdetail[19].toLowerCase().includes(text.toLowerCase());
        });
        setUserData(filteredLst);
    };


    return (
        <>
            <Header2 />
            <section className="appoinment-wrapper">
                <Container>
                    <Form.Group className="mt-5">
                        <Form.Control
                            type="search"
                            placeholder="Search test name ..."
                            value={searchInput}
                            onChange={handleSearch} />
                    </Form.Group>
                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Payment details</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((userdetail, index) => {
                                return <tr key={index}>
                                    <td style={{ fontSize: 15, width: 125 }}>{index + 1}</td>
                                    <td style={{ fontSize: 17 }}><p style={{ textAlign: 'justify', fontWeight: 'bold' }}>{userdetail[6]}</p>
                                        <p style={{ marginTop: '-15px', textAlign: 'justify' }}>Test name : {userdetail[19]}</p>
                                        <p style={{ marginTop: '-15px', textAlign: 'justify' }}>Contact No.: {userdetail[7]}</p>
                                        <p style={{ marginTop: '-15px', textAlign: 'justify' }}>Amount paid / Total amount : {userdetail[13] + " / " + userdetail[12]}</p>
                                        <p style={{ marginTop: '-15px', textAlign: 'justify' }}>Balance: {userdetail[14]}</p>
                                        {/* <p style={{ marginTop: '-15px', textAlign: 'justify', fontWeight: 'bold', color: 'blue' }} onClick={event => downloadButton(userdetail[22])}>Download bill</p> */}
                                    </td>
                                    <td style={{ width: 300 }}><Button style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={event => acceptButton(userdetail[6], userdetail[7], userdetail[13], userdetail[14])}>Pay bill</Button></td>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                    <Modal show={show} onHide={handleClose}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Fill details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <Row>
                                <Col md={12} lg={12}>
                                    <div className="right-side">
                                        <h5>Patient name</h5>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" name="patientname" value={inputField.patientname} onChange={inputsHandler} readOnly />
                                        </Form.Group>
                                        <h5>Contact number</h5>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" name="contactnumber" value={inputField.contactnumber} onChange={inputsHandler} readOnly />
                                        </Form.Group>
                                        <h5>Amount paid</h5>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" name="amountpaid" value={inputField.amountpaid} onChange={inputsHandler} readOnly />
                                        </Form.Group>
                                        <h5>Enter amount</h5>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter value" name="balance" value={inputField.balance} onChange={inputsHandler} />
                                        </Form.Group>
                                    </div>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='primary' size="large" style={{ fontSize: '16px' }} onClick={submitButton}>Save changes</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </section>
            <Footer />
        </>
    );
};

export default BillPayment;