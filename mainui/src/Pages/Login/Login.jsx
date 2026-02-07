import React, { useState } from 'react';

import './Login.css';
import Footer from '../Home/Footer/Footer.jsx';
import Header from '../Home/Header/Header.jsx';
import axios from "axios";
import { ipofserver } from '../../global';
import { Link } from 'react-router-dom';
import Select from 'react-select';
/*eslint-disable eqeqeq*/
/* eslint-disable */

const Login = () => {

    const [isSearchable, setIsSearchable] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const colourOptions = [
        { value: '', label: 'Select Role' },
        { value: 'Admin', label: 'Admin' },
        { value: 'Lab Incharge', label: 'Lab Incharge' },
    ];

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = e => {
        setSelectedValue(e.value);
    }

    const [inputField, setInputField] = useState({
        username: 'a',
        password: 'a',

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
        setSelectedValue('')
    }
    const submitButton = () => {

        if (inputField.username == '' || inputField.password == '' || selectedValue == '') {
            alert("Please enter all details !")
            // clearInput()
        }
        else {
            // alert(inputField.username + " "  + inputField.password + " ")

            axios.post(ipofserver + 'login', {
                username: inputField.username,
                password: inputField.password,
                typeofuser: selectedValue,
            })
                .then(function (response) {
                    if (response.data == "success") {
                        clearInput()
                        localStorage.setItem('LoginUsername', inputField.username);
                        localStorage.setItem('LoginUsertype', selectedValue);
                        if(selectedValue == 'Admin'){
                            window.location.href = '/Adminhome'
                        }
                        else{
                            window.location.href = '/main'
                        }
                    }
                    else {
                        alert("Invalid username and password !")
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
                                                <img src="https://media.gettyimages.com/id/1357079126/vector/medical-worker-with-microscope-color.jpg?s=1024x1024&w=gi&k=20&c=0VpaKvR1dnetlCwt0f5nrCbh1RQHf8w3k9wtQD8NPYU=" className="card-img" alt="logo" />
                                                <h4 className="mt-3 mb-5 pb-1">DMCE Pathology Laloratory And Diagnostic Center</h4>
                                            </div>
                                            <p className="d-flex justify-content-start">Please login to your account</p>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="username" name="username" value={inputField.username} onChange={inputsHandler} className="form-control"
                                                    placeholder="Enter Username" required />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="password" placeholder="Enter Password" className="form-control" name="password" value={inputField.password} onChange={inputsHandler} required />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <Select
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    isLoading={isLoading}
                                                    isSearchable={isSearchable}
                                                    options={colourOptions}
                                                    onChange={handleChange}
                                                    value={colourOptions.find(obj => obj.value === selectedValue)}
                                                    styles={{
                                                        // Add the styles object to adjust the z-index
                                                        menu: provided => ({
                                                            ...provided,
                                                            zIndex: 9999, // Adjust this value as needed
                                                        }),
                                                    }}
                                                />
                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button className="theme-btn btn-fill" type="submit" onClick={submitButton}>Log in</button>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2" style={{ marginRight: '200px' }}>Don't have an account?</p>
                                                {/* <a type="button" className="btn btn-outline-danger" href='/register' >Create new</a> */}
                                                <Link to="/register" type="button" className="list-item text-decoration-none">Register</Link>
                                            </div>



                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <h4 className="mb-4">We are more than just a company</h4>
                                            <p className="small mb-0">Pathology is the study of disease. It is the bridge between science and medicine. It underpins every aspect of patient care, from diagnostic testing and treatment advice to using cutting-edge genetic technologies and preventing disease.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row my-5">
                                    <div className="col-12">
                                        <div className="text-center">
                                            <h4>or sign up with:</h4>
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

export default Login;