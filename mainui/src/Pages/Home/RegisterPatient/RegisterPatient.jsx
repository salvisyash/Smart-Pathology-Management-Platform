import { Col, Container, Row } from 'react-bootstrap';
import './RegisterPatient.css';
import Footer from '../../Home/Footer/Footer.jsx';
import Header2 from '../../Home/Header2/Header2.jsx';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { ipofserver } from '../../../global';
import Select from 'react-select';
import { useFormik } from "formik";
import { Country, State } from 'country-state-city';
import Button from 'react-bootstrap/Button';
/*eslint-disable eqeqeq*/
/* eslint-disable */

const RegisterPatient = () => {


    const [selectedContry, setselectedContry] = useState('')
    const [selectedState, setselectedState] = useState('')

    const [userData, setUserData] = useState([])

    const [selectedItems, setSelectedItems] = useState([]);

    const items = userData.map(subList => subList[1]);

    const handleItemClick = (item) => {
        if (!selectedItems.includes(item)) {
            setSelectedItems([...selectedItems, item]);
            const valuedd = userData.filter((user) => item == user[1]);
            if (inputField.totalamount == '') {
                setInputField({
                    todaydate: inputField.todaydate,
                    labno: inputField.labno,
                    sampledate: inputField.sampledate,
                    patientname: inputField.patientname,
                    contactno: inputField.contactno,
                    age: inputField.age,
                    email: inputField.email,
                    patientaddress: inputField.patientaddress,
                    pincode: inputField.pincode,
                    totalamount: parseInt(valuedd[0][2]),
                    amountpaid: inputField.amountpaid,
                    balanceamount: parseInt(valuedd[0][2]),
                    doctorname: inputField.doctorname,
                });
            }
            else {
                setInputField({
                    todaydate: inputField.todaydate,
                    labno: inputField.labno,
                    sampledate: inputField.sampledate,
                    patientname: inputField.patientname,
                    contactno: inputField.contactno,
                    age: inputField.age,
                    email: inputField.email,
                    patientaddress: inputField.patientaddress,
                    pincode: inputField.pincode,
                    totalamount: parseInt(inputField.totalamount) + parseInt(valuedd[0][2]),
                    amountpaid: inputField.amountpaid,
                    balanceamount: parseInt(inputField.totalamount) + parseInt(valuedd[0][2]),
                    doctorname: inputField.doctorname,
                });
            }
        }
    };

    const handleRemoveItemClick = (itemToRemove) => {
        const updatedItems = selectedItems.filter((item) => item !== itemToRemove);
        setSelectedItems(updatedItems);
        const valuedd = userData.filter((user) => itemToRemove == user[1]);
        console.log(updatedItems)
        if (updatedItems.length == 0) {
            setInputField({
                todaydate: inputField.todaydate,
                labno: inputField.labno,
                sampledate: inputField.sampledate,
                patientname: inputField.patientname,
                contactno: inputField.contactno,
                age: inputField.age,
                email: inputField.email,
                patientaddress: inputField.patientaddress,
                pincode: inputField.pincode,
                totalamount: '',
                amountpaid: inputField.amountpaid,
                balanceamount: '',
                doctorname: inputField.doctorname,
            });
        }
        else {
            setInputField({
                todaydate: inputField.todaydate,
                labno: inputField.labno,
                sampledate: inputField.sampledate,
                patientname: inputField.patientname,
                contactno: inputField.contactno,
                age: inputField.age,
                email: inputField.email,
                patientaddress: inputField.patientaddress,
                pincode: inputField.pincode,
                totalamount: parseInt(inputField.totalamount) - parseInt(valuedd[0][2]),
                amountpaid: inputField.amountpaid,
                balanceamount: parseInt(inputField.totalamount) - parseInt(valuedd[0][2]),
                doctorname: inputField.doctorname,
            });
        }
    };

    const handleCancelClick = () => {
        setSelectedItems([]); // Clear all selected items
        setInputField({
            todaydate: inputField.todaydate,
            labno: inputField.labno,
            sampledate: inputField.sampledate,
            patientname: inputField.patientname,
            contactno: inputField.contactno,
            age: inputField.age,
            email: inputField.email,
            patientaddress: inputField.patientaddress,
            pincode: inputField.pincode,
            totalamount: '',
            amountpaid: '',
            balanceamount: '',
            doctorname: inputField.doctorname,
        });
    };

    const addressFromik = useFormik({
        initialValues: {
            country: null,
            state: null,
            city: null
        },
        onSubmit: (values) => console.log(JSON.stringify(values))
    });

    const countries = Country.getAllCountries();

    const updatedCountries = countries.map((country) => ({
        label: country.name,
        value: country.id,
        ...country
    }));

    const updatedStates = (countryId) =>
        State.getStatesOfCountry('IN').map((state) => ({ label: state.name, value: state.id, ...state }));
    const { values, handleSubmit, setFieldValue, setValues } = addressFromik;

    useEffect(() => {
        axios.get(ipofserver + 'loadAllTests')
            .then(res => {
                setUserData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [values])

    // useEffect(() => { }, [values]);

    const [isSearchable, setIsSearchable] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const colourOptions = [
        { value: '', label: 'Select gender' },
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Others', label: 'Others' },
    ];

    const CityOptions = [
        { value: '', label: 'Select...' },
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Bangalore', label: 'Bangalore' },
        { value: 'Hyderabad', label: 'Hyderabad' },
        { value: 'Chennai', label: 'Chennai' },
        { value: 'Kolkata', label: 'Kolkata' },
        { value: 'Pune', label: 'Pune' },
        { value: 'Ahmedabad', label: 'Ahmedabad' },
        { value: 'Jaipur', label: 'Jaipur' },
        { value: 'Lucknow', label: 'Lucknow' },
        { value: 'Kanpur', label: 'Kanpur' },
        { value: 'Nagpur', label: 'Nagpur' },
        { value: 'Indore', label: 'Indore' },
        { value: 'Thane', label: 'Thane' },
        { value: 'Bhopal', label: 'Bhopal' },
        { value: 'Visakhapatnam', label: 'Visakhapatnam' },
        { value: 'Pimpri-Chinchwad', label: 'Pimpri-Chinchwad' },
        { value: 'Patna', label: 'Patna' },
        { value: 'Vadodara', label: 'Vadodara' },
        { value: 'Ghaziabad', label: 'Ghaziabad' },
        { value: 'Ludhiana', label: 'Ludhiana' },
        { value: 'Agra', label: 'Agra' },
        { value: 'Nashik', label: 'Nashik' },
        { value: 'Faridabad', label: 'Faridabad' },
        { value: 'Meerut', label: 'Meerut' },
        { value: 'Rajkot', label: 'Rajkot' },
        { value: 'Kalyan-Dombivali', label: 'Kalyan-Dombivali' },
        { value: 'Vasai-Virar', label: 'Vasai-Virar' },
        { value: 'Varanasi', label: 'Varanasi' },
        { value: 'Srinagar', label: 'Srinagar' },
        { value: 'Aurangabad', label: 'Aurangabad' },
        { value: 'Dhanbad', label: 'Dhanbad' },
        { value: 'Amritsar', label: 'Amritsar' },
        { value: 'Navi Mumbai', label: 'Navi Mumbai' },
        { value: 'Allahabad', label: 'Allahabad' },
        { value: 'Ranchi', label: 'Ranchi' },
        { value: 'Howrah', label: 'Howrah' },
        { value: 'Coimbatore', label: 'Coimbatore' },
        { value: 'Jabalpur', label: 'Jabalpur' },
        { value: 'Gwalior', label: 'Gwalior' },
        { value: 'Vijayawada', label: 'Vijayawada' },
        { value: 'Jodhpur', label: 'Jodhpur' },
        { value: 'Madurai', label: 'Madurai' },
        { value: 'Raipur', label: 'Raipur' },
        { value: 'Kota', label: 'Kota' },
        { value: 'Chandrapur', label: 'Chandrapur' }
        // Add more cities here...
    ];

    // You can add more cities to the array as needed.


    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValue1, setSelectedValue1] = useState('');

    const handleChange = e => {
        setSelectedValue(e.value);
    }
    const handleChange1 = e => {
        setSelectedValue1(e.value);
    }

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [inputField, setInputField] = useState({
        todaydate: getCurrentDate(),
        labno: '',
        sampledate: getCurrentDate(),
        patientname: '',
        contactno: '',
        age: '',
        patientaddress: '',
        pincode: '',
        totalamount: '',
        amountpaid: '',
        balanceamount: '',
        doctorname: '',
        selectedFile: '',
    })

    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setInputField((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (e.target.name === 'amountpaid') {
            const totalAmount = parseInt(inputField.totalamount);
            const amountPaid = parseInt(value);

            if (!isNaN(totalAmount) && !isNaN(amountPaid)) {
                setInputField({
                    ...inputField,
                    balanceamount: totalAmount - amountPaid,
                });
            }
            else {
                setInputField({
                    ...inputField,
                    balanceamount: totalAmount,
                });
            }
            setInputField((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const [selectedFile, setSelectedFile] = useState();

    function handleChange11(e) {
        var file = e.target.files[0];
        setSelectedFile(file);
    }

    function clearInput() {
        setInputField({
            todaydate: getCurrentDate(),
            labno: '',
            sampledate: getCurrentDate(),
            patientname: '',
            contactno: '',
            age: '',
            email: '',
            patientaddress: '',
            pincode: '',
            totalamount: '',
            amountpaid: '',
            balanceamount: '',
            doctorname: '',
            selectedFile: '',
        });
        setSelectedItems([]); // Clear all selected items
        setSelectedValue('')
        setSelectedValue1('')
    }

    const submitButton = async () => {
        if (inputField.todaydate == '' || inputField.labno == '' || inputField.sampledate == ''
            || inputField.patientname == '' || inputField.contactno == '' || inputField.age == ''
            || inputField.patientaddress == '' || inputField.pincode == '' || inputField.totalamount == ''
            || inputField.amountpaid == '' || inputField.balanceamount == '' || selectedValue == ''
            || selectedContry == '' || selectedState == '' || selectedValue1 == ''
            || selectedItems.length == 0 || inputField.email == '' || selectedValue == '' || inputField.doctorname == '') {
            alert("Please enter all details !")
        }
        else {

            const formData = new FormData();

            formData.append('adminname', localStorage.getItem('LoginUsername'));
            formData.append('typeofuser', localStorage.getItem('LoginUsertype'));
            formData.append('todaydate', inputField.todaydate);
            formData.append('labno', inputField.labno);
            formData.append('sampledate', inputField.sampledate);
            formData.append('patientname', inputField.patientname);
            formData.append('contactno', inputField.contactno);
            formData.append('age', inputField.age);
            formData.append('email', inputField.email);
            formData.append('patientaddress', inputField.patientaddress);
            formData.append('pincode', inputField.pincode);
            formData.append('totalamount', inputField.totalamount);
            formData.append('amountpaid', inputField.amountpaid);
            formData.append('balanceamount', inputField.balanceamount);
            formData.append('gender', selectedValue);
            formData.append('contry', selectedContry);
            formData.append('state', selectedState);
            formData.append('city', selectedValue1);
            formData.append('alltests', selectedItems.join(','));
            formData.append('File', selectedFile);
            formData.append('doctorname', inputField.doctorname);

            const res = await axios.post(`${ipofserver}regPatient`, formData);

            if (res.data == "success") {
                alert("Patient test added sucessfully !")
                clearInput()
            }
            else {
                alert("Patient test is already pending !")
                clearInput()
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
                                <h1 className="mt-5">Register Patient</h1>
                            </div>
                            <div className="appoinment-form row">
                                <h5 className='theme-btn btn-fill'>Patient Details</h5>
                                <Col md={4} lg={4}>
                                    <input type="date" placeholder="Date"
                                        name="todaydate" value={inputField.todaydate} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <Col md={4} lg={4}>
                                    <input type="text" placeholder="Lab no."
                                        name="labno" value={inputField.labno} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <Col md={4} lg={4}>
                                    <input type="date" placeholder="Sample date"
                                        name="sampledate" value={inputField.sampledate} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>

                                <Col md={6} lg={6}>
                                    <input type="text" placeholder="Enter patient name"
                                        name="patientname" value={inputField.patientname} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <Col md={6} lg={6}>
                                    <input type="number" placeholder="Enter contact no."
                                        name="contactno" value={inputField.contactno} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>

                                <Col md={6} lg={6}>
                                    <Select
                                        className="basic-single selectclass"
                                        classNamePrefix="select"
                                        isLoading={isLoading}
                                        isSearchable={isSearchable}
                                        options={colourOptions}
                                        onChange={handleChange}
                                        value={colourOptions.find(obj => obj.value === selectedValue)}
                                        styles={{
                                            menu: provided => ({
                                                ...provided,
                                                zIndex: 9999, // Adjust this value as needed
                                            }),
                                        }}
                                    />
                                </Col>
                                <Col md={6} lg={6}>
                                    <input type="number" placeholder="Enter age"
                                        name="age" value={inputField.age} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <Col md={12} lg={12}>
                                    <input type="text" placeholder="Enter email"
                                        name="email" value={inputField.email} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <h5 className='theme-btn btn-fill mt-3'>Select Tests</h5>
                                <Col md={6} lg={6}>
                                    <div className="left-side">
                                        <h6>All Tests</h6>
                                        <ul>
                                            {items.map((item, index) => (
                                                <li key={index} onClick={() => handleItemClick(item)}>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Col>
                                <Col md={6} lg={6}>
                                    <div className="right-side">
                                        <h6>Selected Tests</h6>
                                        <ul>
                                            {selectedItems.map((item, index) => (
                                                <li key={index}>
                                                    {item}
                                                    <button className="cross-button" onClick={() => handleRemoveItemClick(item)}>X</button>
                                                </li>
                                            ))}
                                        </ul>
                                        {selectedItems.length > 0 && (
                                            <Button style={{ backgroundColor: 'red', borderColor: 'red' }} onClick={handleCancelClick}>Cancel</Button>
                                        )}
                                    </div>
                                </Col>
                                <h5 className='theme-btn btn-fill mt-3'>Doctor details</h5>
                                <Col md={6} lg={6}>
                                    <label htmlFor="prescription" style={{ textAlign: 'left', display: 'block', marginTop: 10, marginLeft: 5 }}>Doctor prescription</label>
                                    <input type="file" placeholder="Doctor prescription"
                                        name="prescription" onChange={handleChange11}
                                        className="placeholder-black fileclass" />
                                </Col>
                                <Col md={6} lg={6}>
                                    <label htmlFor="Doctorname" style={{ textAlign: 'left', display: 'block', marginTop: 10, marginLeft: 5 }}>Doctor name</label>
                                    <input type="name" placeholder="Doctor name"
                                        name="doctorname" value={inputField.doctorname} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <h5 className='theme-btn btn-fill mt-3'>Address details</h5>
                                <Col md={12} lg={12}>
                                    <label htmlFor="patientaddress" style={{ textAlign: 'left', display: 'block', marginTop: 10, marginLeft: 5 }}>Enter address</label>
                                    <input type="text" placeholder="Enter address"
                                        name="patientaddress" value={inputField.patientaddress} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <Col md={6} lg={6}>
                                    <label htmlFor="country" style={{ textAlign: 'left', display: 'block', marginTop: 10, marginLeft: 5 }}>Select country</label>
                                    <Select
                                        className="basic-single selectclass"
                                        id="country"
                                        name="country"
                                        label="country"
                                        options={updatedCountries}
                                        value={values.country}
                                        onChange={(value) => {
                                            setValues({ country: value, state: null, city: null }, false);
                                            setselectedContry(value.label)
                                        }}
                                        styles={{
                                            menu: provided => ({
                                                ...provided,
                                                zIndex: 9999, // Adjust this value as needed
                                            }),
                                        }}
                                    />
                                </Col>
                                <Col md={6} lg={6}>
                                    <label htmlFor="state" style={{ textAlign: 'left', display: 'block', marginTop: 10, marginLeft: 5 }}>Select state</label>
                                    <Select
                                        className="basic-single selectclass"
                                        id="state"
                                        name="state"
                                        options={updatedStates(values.country)}
                                        value={values.state}
                                        onChange={(value) => {
                                            setValues({ state: value, city: null }, false);
                                            setselectedState(value.label)
                                        }}
                                        styles={{
                                            menu: provided => ({
                                                ...provided,
                                                zIndex: 9999, // Adjust this value as needed
                                            }),
                                        }}
                                    />
                                </Col>
                                <Col md={6} lg={6}>
                                    <label htmlFor="city" style={{ textAlign: 'left', display: 'block', marginTop: 10, marginLeft: 5 }}>Select city</label>
                                    <Select
                                        name="city"
                                        className="basic-single selectclass"
                                        classNamePrefix="select"
                                        isLoading={isLoading}
                                        isSearchable={isSearchable}
                                        options={CityOptions}
                                        onChange={handleChange1}
                                        value={CityOptions.find(obj => obj.value === selectedValue1)}
                                        styles={{
                                            menu: provided => ({
                                                ...provided,
                                                zIndex: 9999, // Adjust this value as needed
                                            }),
                                        }}
                                    />
                                </Col>
                                <Col md={6} lg={6}>
                                    <label htmlFor="pincode" style={{ textAlign: 'left', display: 'block', marginTop: 10, marginLeft: 5 }}>Enter pincode</label>
                                    <input type="number" placeholder="Enter pincode"
                                        name="pincode" value={inputField.pincode} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <h5 className='theme-btn btn-fill mt-3'>Payment details</h5>
                                <Col md={12} lg={12}>
                                    <label htmlFor="totalamount" style={{ textAlign: 'left', display: 'block', marginTop: 10, marginLeft: 5 }}>Total Amount</label>
                                    <input type="number" placeholder="Total amount"
                                        name="totalamount" value={inputField.totalamount} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>

                                <Col md={6} lg={6}>
                                    <label htmlFor="amountpaid" style={{ textAlign: 'left', display: 'block', marginTop: 10, marginLeft: 5 }}>Amount paid</label>
                                    <input type="number" placeholder="Amount paid"
                                        name="amountpaid" value={inputField.amountpaid} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <Col md={6} lg={6}>
                                    <label htmlFor="balanceamount" style={{ textAlign: 'left', display: 'block', marginTop: 10, marginLeft: 5 }}>Balance amount</label>
                                    <input type="number" placeholder="Balance amount"
                                        name="balanceamount" value={inputField.balanceamount} onChange={inputsHandler}
                                        className="placeholder-black inputclass" />
                                </Col>
                                <button className="theme-btn btn-fill form-btn mt-3" onClick={submitButton}>Save</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    );
};

export default RegisterPatient;