import React from "react";
import "./Tech.scss";
import Header from "./Header/TechHeader.jsx";
import { Progress, Space } from "antd";

const Tech = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <div className="applications">
          <Space wrap>
            <Progress type="circle" percent={75} />
            <Progress type="circle" percent={70} status="exception" />
            <Progress type="circle" percent={100} />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Tech;
