import React from "react";
import TableEquipment from "../../../../Tech/Table/TableEquipment";
import Header from "../../../../Header/Header";
import './OnField.scss'
import AppFooter from "../../../../Footer/AppFooter";

const OnField = () => {
  document.title = "Страница IT-отдела";
  return (
    <div>
      <Header />
      <div className="table">
        <TableEquipment />
      </div>
      <AppFooter/>
    </div>
  );
};

export default OnField;
