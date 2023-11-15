import React from "react";
import Header from "../Header/Header";
import AppFooter from "../Footer/AppFooter";
import Cards from "./Components/Cards/Card";
import "./IT.scss";


const IT = () => {
  document.title = "Страница IT-отдела";
  return (
    <div>
      <Header />
      <div className="main_block">
       <Cards/>
      </div>
      <AppFooter/>
    </div>
  );
};

export default IT;
