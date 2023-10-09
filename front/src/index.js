import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Header from "./header/HRheader.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NewEmployee from "./HR/Pages/New Employee/NewEmployee";
import EmployeePage from "./HR/Pages/EmployeePage/EmployeePage.jsx";
import Auth from "./HR/Auth/auth.jsx";
import IT from "./IT/IT.jsx"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Auth />} /> {/* Стартовая страница */}
        <Route path="/newEmployee" element={<NewEmployee />} />
        <Route path="/employees/:employeeId" element={<EmployeePage />} />
        <Route path="/employees" element={<App />} />
        <Route path="/IT" element={<IT/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
