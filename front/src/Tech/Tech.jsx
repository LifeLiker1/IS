import React from "react";
import "./Tech.scss";
import Header from "./Header/TechHeader.jsx";
import { Tabs, Progress, Space } from "antd";
import TableEquipment from "./Table/table";
import { CountProvider, useCount } from "./Table/CountContext";

const Tech = () => {
  return (
    <CountProvider>
      <TechContent />
    </CountProvider>
  );
};

const TechContent = () => {
  const { countNotWorking } = useCount();

  return (
    <div>
      <Header />
      <div className="main">
        <div className="tables">
          <TableEquipment />
        </div>
        <div className="statistic">
          <Space wrap>
            <Progress type="circle" percent={100 - countNotWorking} />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Tech;
