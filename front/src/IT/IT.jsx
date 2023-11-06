import React, { useState } from "react";
import Header from "./Components/Header/ITHeader";
import Table from "./Table/Table";
import { Button, Modal } from "antd";
import "./IT.scss";
import { getTickets } from "./Functions/Responses"

const IT = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [countData, setCountData] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = async () => {
    const ticketsData = await getTickets();
    setIsModalOpen(false);

    // Вычислите сумму значений count
    const totalCount = ticketsData.reduce(
      (total, ticket) => total + ticket.count,
      0
    );
    setCountData(totalCount);
  };

  return (
    <div>
      <Header />
      <div className="main_block">
        <Table />
        <Button onClick={showModal}>Добавить талоны</Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        ></Modal>
      </div>
    </div>
  );
};

export default IT;
