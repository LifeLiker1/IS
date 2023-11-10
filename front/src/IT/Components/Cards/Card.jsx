import React from "react";
import "./Cards.scss";
import { Card } from "antd";
import onField from "../../../Images/OnField.jpeg";
import inOffice from "../../../Images/InOffice.jpeg";
import { Link } from "react-router-dom";
const { Meta } = Card;

const Cards = () => {
  return (
    <div className="mainBlock">
      <div className="cards-container">
        <Link to={"equipmentOnField"}>
          <Card hoverable cover={<img alt="example" src={onField} />}>
            <Meta title="Оборудование на парковках" />
          </Card>
        </Link>
        <Link to={"equipmentInOffice"}>
          <Card hoverable cover={<img alt="example" src={inOffice} />}>
            <Meta title="Оборудование в офисе" />
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
