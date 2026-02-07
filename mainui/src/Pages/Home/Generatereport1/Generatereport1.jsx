import { Col, Container, Row } from 'react-bootstrap';
import './Generatereport.css';
import Footer from '../Footer/Footer.jsx';
import Header1 from '../Header1/Header1.jsx';
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

    const acceptButton = (listval,email,personname,labno,gender,age) => {
        localStorage.setItem('reportemail', email);
        localStorage.setItem('reportpersonname', personname);
        localStorage.setItem('reportlabno', labno);
        localStorage.setItem('reportgender', gender);
        localStorage.setItem('reportage', age);
        handleItemClick(listval)
        setSelectedLiIndex(0); // Set the selected <li> index
        handleShow();
    }

    const handleItemClick = (item) => {
        // alert(index)
        // setSelectedLiIndex(index); // Set the selected <li> index
        axios.post(ipofserver + 'getValueofTest', {
            valueitem: item,
        })
            .then(function (response) {
                // console.log(response.data.length)
                if (response.data.length != 0) {
                    setFormData1(response.data)
                }
                else {
                    alert("Something wrong !")
                }
            })
            .catch(function (error) {
                return error;
            });
    };

    const submitButton1 = async () => {
        try {
            const finallst = [];
            formData1.map(async (input, inputid) => {
                console.log(inputid);
                var x = document.getElementById('Input_' + inputid).value;
                finallst.push(x)
            })
            var bool = true
            finallst.map((ele, id) => {
                if (ele == '' || ele == undefined) {
                    bool = false
                }
            })
            if (!bool) {
                alert("Please enter details!")
            }
            else {
                // alert("Done")
                axios.post(ipofserver + 'generateReport', {
                    formlist: formData1,
                    anslist: finallst,
                    reportemail: localStorage.getItem("reportemail"),
                    reportpersonname: localStorage.getItem("reportpersonname"),
                    reportlabno: localStorage.getItem("reportlabno"),
                    reportgender: localStorage.getItem("reportgender"),
                    reportage: localStorage.getItem("reportage")
                })
                    .then(function (response) {
                        // alert(response.data)
                        if (response.data == "success") {
                            alert("Report send on user mail !")
                            setShow(false);
                        }
                        else {
                            alert("Something wrong !")
                        }
                    })
                    .catch(function (error) {
                        return error;
                    });
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Header1 />
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
                                    <td style={{ width: 300 }}><Button style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={event => acceptButton(userdetail[19],userdetail[9],userdetail[6],userdetail[4],userdetail[15],userdetail[8])}>Generate report</Button></td>
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
                                        {formData1.map((item1, id) => {
                                            if (item1.split('&&').length == 2) {
                                                return (
                                                    <div>
                                                        <h5>{item1.split('&&')[0]}</h5>
                                                        <Form.Group className="mb-3" key={id}>
                                                            <Form.Label>{item1.split('&&')[1]}</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder={"Enter value of " + item1.split('&&')[1]}
                                                                id={'Input_' + id}
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                );
                                            }
                                            else {
                                                return <Form.Group className="mb-3" key={id}>
                                                    <Form.Label>{item1}</Form.Label>
                                                    <Form.Control type="text" placeholder={"Enter value of " + item1} id={'Input_' + id} />
                                                </Form.Group>
                                            }
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