import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './Context/AuthProvider';
import About from './Pages/About/About/About';
import Approved from './Pages/Approved/Approved';
import Contact from './Pages/Contact/Contact/Contact';
import Dentist from './Pages/Dentist/Denitst/Dentist';
import Adminhome from './Pages/Home/Adminhome/Adminhome.jsx';
import Home from './Pages/Home/Home/Home.jsx';
import Main from './Pages/Home/Main/Main.jsx';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Adminlogin from './Pages/Adminlogin/Adminlogin';
import NotFound from './Pages/NotFound/NotFound'; 
import Service from './Pages/Services/Service/Service';
import AddNewTest from './Pages/Home/AddNewTest/AddNewTest';
import RegisterPatient from './Pages/Home/RegisterPatient/RegisterPatient';
import GenerateReport from './Pages/Home/Generatereport/Generatereport';
import RegisterPatient1 from './Pages/Home/RegisterPatient1/RegisterPatient1';
import GenerateReport1 from './Pages/Home/Generatereport1/Generatereport1';
import EditTest from './Pages/Home/EditTest/EditTest';
import BillPayment from './Pages/Home/BillPayment/BillPayment';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Main' element={<Main />} />
          <Route path='/about' element={<About />} />
          <Route path='/service' element={<Service />} />
          <Route path='/dentist' element={<Dentist />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/approved' element={<Approved />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Adminlogin' element={<Adminlogin />} />
          <Route path='/Adminhome' element={<Adminhome />} />
          <Route path='/addnewtest' element={<AddNewTest />} />
          <Route path='/edittest' element={<EditTest />} />
          <Route path='/registerPatient' element={<RegisterPatient />} />
          <Route path='/generatereport' element={<GenerateReport />} />
          <Route path='/registerPatient1' element={<RegisterPatient1 />} />
          <Route path='/generatereport1' element={<GenerateReport1 />} />
          <Route path='/billPayment' element={<BillPayment />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
       
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
