import React from "react";
import Header from "./Components/Header/ITHeader";
import Cards from "./Components/Cards/Card";
import "./IT.scss";


const IT = () => {
  return (
    <div>
      <Header />
      <div className="main_block">
       <Cards/>
      </div>
    </div>
  );
};

export default IT;
