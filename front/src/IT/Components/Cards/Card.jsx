import React from "react";
import "./Cards.scss";
import { cardForField, cardForWarehouse, cardForOffice } from "./CardStyle";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const Cards = () => {
  return (
    <div className="mainBlock">
      <div className="cards-container">
        <Link to={"equipmentOnField"}>
          <Card hoverable style={cardForField}>
            <Meta title="Оборудование на парковках" />
          </Card>
        </Link>
        <Link to={"equipmentInOffice"}>
          <Card hoverable style={cardForOffice} >
            <Meta title="Оборудование в офисе" />
          </Card>
        </Link>
        <Link to={"warehouse"}>
          <Card
            hoverable
            style={cardForWarehouse}
          >
            <Meta title="Перейти на склад" />
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
