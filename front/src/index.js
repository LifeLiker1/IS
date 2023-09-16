import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from "./header/header.jsx"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NewEmployee from './Pages/New Employee/NewEmployee';
import EmployeePage from './Pages/EmployeePage/EmployeePage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/newEmployee" element={<NewEmployee/>} />
        <Route path='/employeePage' element={EmployeePage}/>
      </Routes>
    </Router>
  </React.StrictMode>
);


