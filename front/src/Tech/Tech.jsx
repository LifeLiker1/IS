import React, { useState, useEffect } from "react";
import "./Tech.scss";
import Header from "../Header/Header";
import { Progress, Button } from "antd";
import TableEquipment from "./Table/TableEquipment";
import { CountProvider, useCount } from "./Table/CountContext";
import { getTickets } from "../IT/Functions/Responses";
import OnShift from "./Table/Functions/OnShift";
import AppFooter from "../Footer/AppFooter";


const Tech = () => {
  document.title = "Страница Диспетчера";
  return (
    <CountProvider>
      <TechContent />
    </CountProvider>
  );
};
const TechContent = () => {
  const { countNotWorking } = useCount();
  const [statistic, setStatistic] = useState(false);
  const [countData, setCountData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const ticketsData = await getTickets();
        const totalCount = ticketsData.reduce(
          (total, ticket) => total + ticket.count,
          0
        );
        setCountData(totalCount);
        setDataLoaded(true);
      } catch (error) {
        console.error("Ошибка при получении данных", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="main">
        <div className="tables">
          {dataLoaded ? <TableEquipment /> : <p>Загрузка данных...</p>}
        </div>
        <div>
          <p>На смене сегодня: <OnShift /></p>
        </div>
        <Button onClick={() => setStatistic(!statistic)}>
          {statistic ? "Скрыть статистику" : "Показать статистику"}
        </Button>
        {statistic && dataLoaded ? (
          <div className="statistic">
            <p>Работающее оборудование</p>
            <Progress percent={100 - countNotWorking} status="active" />
            <p>Остаток талонов {countData} штук</p>
          </div>
        ) : null}
        <AppFooter/>
      </div>
    </div>
  );
};

export default Tech;
