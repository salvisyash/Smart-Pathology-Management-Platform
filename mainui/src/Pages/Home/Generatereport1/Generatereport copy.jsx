import { Col, Container, Row } from 'react-bootstrap';
import './Generatereport.css';
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

const Generatereport = () => {

    const [formData, setFormData] = useState([])
    const [formData1, setFormData1] = useState([])
    const [userData, setUserData] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = event => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get(ipofserver + 'loadPatientTests')
            .then(res => {
                // console.log(res.data)
                setUserData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const [selectedLiIndex, setSelectedLiIndex] = useState(null); // State to track the selected <li>

    const acceptButton = (listval) => {
        setFormData(listval.split(','))
        handleItemClick(listval.split(',')[0])
        setSelectedLiIndex(0); // Set the selected <li> index
        handleShow();
    }

    const handleItemClick = (item, index) => {
        // alert(index)
        setSelectedLiIndex(index); // Set the selected <li> index
        axios.post(ipofserver + 'getValueofTest', {
            valueitem: item,
        })
            .then(function (response) {
                if (response.data != "") {
                    setFormData1(response.data.split(','))
                }
                else {
                    alert("Something wrong !")
                }
            })
            .catch(function (error) {
                return error;
            });
    };

    const getSubList = (item) => {
        return axios.post(ipofserver + 'getValueofTest', {
            valueitem: item,
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                throw error; // Rethrow the error to be handled elsewhere if needed
            });
    };

    const submitButton1 = async () => {
        try {
            const finallst = [];
            for (const [id, lst] of formData.entries()) {
                const data = await getSubList(lst);
                var mainlst = data.split(',');
                mainlst.map(async (input, inputid) => {
                    console.log(lst + '_' + inputid);
                    var x = document.getElementById(lst + '_' + inputid).value;
                    finallst.push(x)
                })
            }

            // Now finallst contains the responses from getSubList
            console.log(finallst);

            // You can process finallst or perform other actions here
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Header2 />
            <section className="appoinment-wrapper">
                <Container>
                    <Table striped bordered hover className='mt-5'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Patient details</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((userdetail, index) => {
                                return <tr key={index}>
                                    <td style={{ fontSize: 15, width: 125 }}>{index + 1}</td>
                                    <td style={{ fontSize: 17 }}><p style={{ textAlign: 'justify', fontWeight: 'bold' }}>{userdetail[6]}</p><p style={{ marginTop: '-15px', textAlign: 'justify' }}>Email : {userdetail[9]}</p><p style={{ marginTop: '-15px', textAlign: 'justify' }}>Contact No.: {userdetail[7]}</p><p style={{ marginTop: '-15px', textAlign: 'justify' }}>Gender / Age : {userdetail[15] + " / " + userdetail[8]}</p></td>
                                    <td style={{ width: 300 }}><Button style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={event => acceptButton(userdetail[19])}>Generate report</Button></td>
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
                        <Modal.Body>
                            <Row>
                                <Col md={4} lg={4}>
                                    <div className="left-side">
                                        <ul>
                                            {formData.map((item, index) => (
                                                <li key={index} className='lielement' onClick={() => handleItemClick(item, index)}
                                                    style={{
                                                        backgroundColor: 'rgb(187 176 176)',
                                                        borderColor: 'rgb(187 176 176)',
                                                        backgroundColor: selectedLiIndex === index ? 'rgb(64, 174, 207)' : 'rgb(187 176 176)',
                                                        borderColor: selectedLiIndex === index ? 'rgb(64, 174, 207)' : 'rgb(187 176 176)',
                                                        color: selectedLiIndex === index ? 'white' : 'initial'
                                                    }}>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Col>
                                <Col md={8} lg={8}>
                                    <div className="right-side">
                                        {formData1.map((item1, id) => {
                                            return <Form.Group className="mb-3" key={id}>
                                                <Form.Label>{item1}</Form.Label>
                                                <Form.Control type="text" placeholder={"Enter value of " + item1} id={formData[selectedLiIndex] + '_' + id} />
                                            </Form.Group>
                                        })}
                                    </div>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='primary' size="large" style={{ fontSize: '16px' }} onClick={submitButton1}>Save changes</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </section>
            <Footer />
        </>
    );
};

export default Generatereport;