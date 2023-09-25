import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from "./header/header.jsx"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NewEmployee from './Pages/New Employee/NewEmployee';
import EmployeePage from './Pages/EmployeePage/EmployeePage.jsx';
import Auth from './Auth/auth.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/newEmployee" element={<NewEmployee/>} />
        <Route path='/employees/:employeeId' element={<EmployeePage/>}/>
        <Route path='/login' element={<Auth/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);


