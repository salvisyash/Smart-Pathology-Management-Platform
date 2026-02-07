import { Container } from 'react-bootstrap';
import './EditTest.css';
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

const Appoinment = () => {

    const [inputField, setInputField] = useState({
        testid: '',
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

    const [userData, setUserData] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = event => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get(ipofserver + 'loadAllTests')
            .then(res => {
                // console.log(res.data)
                setUserData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const rejectButton = (id, name) => {
        axios.post(ipofserver + 'deleteTest', {
            testid: id,
            testname: name,
        })
            .then(function (response) {
                window.location.href = '/edittest'
            })
            .catch(function (error) {
                return error;
            });
    }

    const acceptButton = (id, name, cost, description, values, actualvalues) => {
        setInputField({
            testid: id,
            testname: name,
            testcost: cost,
            testdescription: description,
            testvalues: values,
            actualvalues: actualvalues,
        });
        handleShow();
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
                axios.post(ipofserver + 'updateTest', {
                    testid: inputField.testid,
                    testname: inputField.testname,
                    testcost: inputField.testcost,
                    testdescription: inputField.testdescription,
                    testvalues: inputField.testvalues,
                    actualvalues: inputField.actualvalues,
                })
                    .then(function (response) {
                        if (response.data == "success") {
                            alert("Test updated sucessfully !")
                            window.location.href = '/edittest'
                        }
                        else {
                            alert("Something wrong !")
                            window.location.href = '/edittest'
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
                    <Table striped bordered hover className='mt-5'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Test name</th>
                                <th>Description</th>
                                <th>Cost</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((userdetail, index) => {
                                return <tr key={index}>
                                    <td style={{ fontSize: 15 }}>{index + 1}</td>
                                    <td style={{ fontSize: 15 }}>{userdetail[1]}</td>
                                    <td style={{ fontSize: 15, width: 550, textAlign: 'justify' }}>{userdetail[3]}</td>
                                    <td style={{ fontSize: 15 }}>{userdetail[2]}/- Rs.</td>
                                    <td><Button style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={event => acceptButton(userdetail[0], userdetail[1], userdetail[2], userdetail[3], userdetail[4], userdetail[5])}>Edit</Button></td>
                                    <td><Button style={{ backgroundColor: 'red', borderColor: 'red' }} onClick={event => rejectButton(userdetail[0], userdetail[1])}>Delete</Button></td>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                    <Modal show={show} onHide={handleClose}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Update</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" hidden>
                                <Form.Control type="text" name="testid" value={inputField.testid} onChange={inputsHandler} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Test Name</Form.Label>
                                <Form.Control type="text" name="testname" value={inputField.testname} onChange={inputsHandler} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Test cost</Form.Label>
                                <Form.Control type="number" name="testcost" value={inputField.testcost} onChange={inputsHandler} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Test description</Form.Label>
                                <Form.Control as="textarea" rows={3} name="testdescription" value={inputField.testdescription} onChange={inputsHandler} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Test values</Form.Label>
                                <Form.Control type="text" name="testvalues" value={inputField.testvalues} onChange={inputsHandler} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Test values</Form.Label>
                                <Form.Control type="text" name="actualvalues" value={inputField.actualvalues} onChange={inputsHandler} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='primary' onClick={submitButton}>Update</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </section>
            <Footer />
        </>
    );
};

export default Appoinment;