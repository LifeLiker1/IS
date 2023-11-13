import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NewEmployee from "./HR/Components/Pages/New Employee/NewEmployee";
import EmployeePage from "./HR/Components/Pages/EmployeePage/EmployeePage.jsx";
import Auth from "./Auth/auth.jsx";
import IT from "./IT/IT.jsx";
import Tech from "./Tech/Tech";
import Sklad from "./IT/Components/Sklad/Sklad_MainPage";
import InOffice from "./IT/Components/Tables/InOffice/InOffice";
import OnField from "./IT/Components/Tables/OnField/OnField";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} /> {/* Стартовая страница */}
        <Route path="/employees" element={<App />} />
        <Route path="/employees/:employeeId" element={<EmployeePage />} />
        <Route path="/newEmployee" element={<NewEmployee />} />
        <Route path="/it" element={<IT />} />
        <Route path="/it/equipmentInOffice" element={<InOffice/>}/>
        <Route path="/it/equipmentOnField" element={<OnField/>}/>
        <Route path="/it/warehouse" element={<Sklad />} />
        <Route path="/tech" element={<Tech />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
