import React, { useState } from "react";
import "./Tech.scss";
import Header from "./Header/TechHeader.jsx";
import { Progress, Button } from "antd";
import TableEquipment from "./Table/table";
import { CountProvider, useCount } from "./Table/CountContext";
import { getTickets } from "../IT/Functions/Responses";

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
  const [countData, setCountData] = useState(null);
  const statVisible = () => {
    setStatistic(!statistic);
  }
  const GetQuantity = async () => {
    const ticketsData = await getTickets();

    // Вычислите сумму значений count
    const totalCount = ticketsData.reduce(
      (total, ticket) => total + ticket.count,
      0
    );
    setCountData(totalCount);
  };

  GetQuantity();

  const ostatok = Math.abs(100000 - countData)
  console.log(ostatok)

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
          <Progress percent={ostatok} status="active"  /><p>Или {countData} штук</p>
        </div>) : (null)}
        
      </div>
    </div>
  );
};

export default Tech;
