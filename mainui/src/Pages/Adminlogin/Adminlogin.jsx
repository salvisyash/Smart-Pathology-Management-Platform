import React, { useState } from 'react';

import './Login.css';
import Footer from '../Home/Footer/Footer.jsx';
import Header from '../Home/Header/Header.jsx';
import axios from "axios";
import { ipofserver } from '../../global';
/*eslint-disable eqeqeq*/
/* eslint-disable */

const Adminlogin = () => {

    const [inputField, setInputField] = useState({
        username: 'admin',       
        password: 'admin',
      
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
            username: '',
            password: '',
           
        });
    }
    const submitButton = () => {
        
        if (inputField.username == ''|| inputField.password == '') {
            alert("Please enter all details !")
            // clearInput()
        }
        else {
            // alert(inputField.username + " "  + inputField.password + " ")

            axios.post(ipofserver + 'adminlogin', {
                username: inputField.username,
                password: inputField.password,
            })
                .then(function (response) {
                    // alert(typeof(response.data))
                    if (response.data == "success") {
                        alert("Admin Login successfully !")
                        clearInput()
                        window.location.href = '/Adminhome'
                    }
                    else {
                        alert("Something wrong !")
                        clearInput()
                    }
                })
                .catch(function (error) {
                    return error;
                });
        }
    }

    return (
        <>
         <Header />
            <section className="h-100 gradient-form pb-5">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center">
                                                <img src="https://genmed.eu/wp-content/uploads/2022/07/pathology-main.jpg" className="card-img" alt="logo" />
                                                <h4 className="mt-3 mb-5 pb-1">DMCE Pathology Laloratory And Diagnostic Center</h4>
                                            </div>
                                            <p className="d-flex justify-content-start">ADMIN LOGIN</p>
                                            
                                                <div className="form-outline mb-4">
                                                    <input  type="text" id="username"  name="username" value={inputField.username} onChange={inputsHandler}  className="form-control"
                                                        placeholder="Enter Username" required />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input  type="password" id="password" placeholder="Enter Password" className="form-control"  name="password" value={inputField.password} onChange={inputsHandler} required />
                                                </div>

                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button className="theme-btn btn-fill" type="submit" onClick={submitButton}>Log in</button>
                                                    
                                                </div>

                                               

                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <h4 className="mb-4">ADMIN LOGIN</h4>
                                            <p className="small mb-0">Pathology is the study of disease. It is the bridge between science and medicine. It underpins every aspect of patient care, from diagnostic testing and treatment advice to using cutting-edge genetic technologies and preventing disease.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row my-5">
                                    <div className="col-12">
                                        <div className="text-center">
                                            <h4>or sign In Admin:</h4>
                                            <div className="doctors-social">
                                                <button className="loginbtn" ><FontAwesomeIcon icon={faGoogle} /></button>
                                                <button className="loginbtn" ><FontAwesomeIcon icon={faGithub} /></button>
                                                <button className="loginbtn"><FontAwesomeIcon icon={faFacebook} /></button>
                                                <button className="loginbtn"><FontAwesomeIcon icon={faTwitter} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Adminlogin;