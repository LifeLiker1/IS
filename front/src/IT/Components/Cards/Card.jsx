import React, { useEffect, useState } from "react";
import "./Cards.scss";
import { cardForField, cardForWarehouse, cardForOffice } from "./CardStyle";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const Cards = () => {
  const [loading, setLoading]= useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timeout);
  }, []);

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
