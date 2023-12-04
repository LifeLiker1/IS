import React from "react";
import "./Warehouse_MainPage.scss";
import Header from "../../../Header/Header";
import { Tabs } from "antd";
import { items } from "./MainPage_Variables";

const sklad = () => {
  const onChange = (key) => {
    console.log(key);
  };
  document.title = "Склад";
  return (
    <div>
      <Header />
      <div className="warehouse_body">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default sklad;
