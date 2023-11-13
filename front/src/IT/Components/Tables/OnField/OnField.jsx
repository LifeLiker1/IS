import React from "react";
import TableEquipment from "../../../../Tech/Table/TableEquipment";
import Header from "../../../../Header/Header";
import './OnField.scss'

const OnField = () => {
  document.title = "Страница IT-отдела";
  return (
    <div>
      <Header />
      <div className="table">
        <TableEquipment />
      </div>
    </div>
  );
};

export default OnField;
