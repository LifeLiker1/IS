import React, { useState } from "react";
import "./Tech.scss";
import Header from "./Header/TechHeader.jsx";
import { Tabs, Progress, Space, Button } from "antd";
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
  const [statistic, setStatistic] = useState(false)
  const statVisible = () => {
    setStatistic(!statistic);
  }

  return (
    <div>
      <Header />
      <div className="main">
        <div className="tables">
          <TableEquipment />
        </div>
        <Button onClick={statVisible}>{statistic ? ("Скрыть статистику"):("Показать статистику")}</Button>
        {statistic ? (<div className="statistic">
          <p>Работающее оборудование</p>
          <Progress percent={100 - countNotWorking} status="active" />
            <p>Остаток талонов</p>
          <Progress percent={100 - countNotWorking} status="active" />
        </div>) : (null)}
        
      </div>
    </div>
  );
};

export default Tech;
