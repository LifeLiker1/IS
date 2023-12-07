import React, { useEffect, useState } from "react";
import { Tabs, Table } from "antd";
// import { useCount } from "./CountContext";
import { fetchDataOnField } from "../../Functions/OnField/ApplicationOnField";
import {
  items,
  locationMap,
  optionsForBarriers,
  optionsForPOFs,
} from "../../Functions/ForTable/VariablesForTable";

import { ColumnsForTable } from "../../Functions/ForTable/TableColumns";
import { ModalForIT } from "../../Interactive/ModalWindows/ModalWindowsForIT/ModalWindowsForIT";
import { ModalForDisp } from "../../Interactive/ModalWindows/ModalWindowsForDisp/ModalWindowsForDisp";

const TableEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  // const { countNotWorking, setCountNotWorking } = useCount(); // Исправлено здесь
  const [selectedLocation, setSelectedLocation] = useState("ADEM");
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [modalParameters, setModalParameters] = useState(null);

  useEffect(() => {
    fetchDataOnField()
      .then((data) => {
        setEquipment(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (equipment.length === 0) {
      fetchDataOnField(selectedLocation, setEquipment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation]);

  const data = equipment.map((item, index) => ({
    key: index.toString(),
    id: item._id,
    name: item.model,
    type: item.type,
    address: item.adress,
    market: item.market,
    tag: item.tag,
  }));
  console.log(data);

  // useEffect(() => {
  //   const count = equipment.reduce((count, item) => {
  //     if (item.tag && item.tag.toLowerCase() === "неисправно") {
  //       return count + 1;
  //     }
  //     return count;
  //   }, 0);
  //   // setCountNotWorking(count); // Исправлено здесь
  // }, [equipment]);

  const handleTabChange = (key) => {
    setActiveTabKey(key);
    const selected = locationMap[key];
    if (selected) {
      setSelectedLocation(selected);
    }
  };

  const handleOpenModal = (record) => {
    setSelectedEquipment(record);

    if (record.type === "Платежный терминал") {
      setModalParameters(optionsForPOFs);
    } else if (
      record.type === "Стойка выезда" ||
      record.type === "Стойка въезда"
    ) {
      setModalParameters(optionsForBarriers);
    }
    setModalVisible(true);
  };

  const handleIssueChange = (value) => {
    setSelectedIssue(value)
  }

  const handleRequestChange = (value) => {
    setSelectedRequest(value);
  };

  const sendRequest = async () => {
    const requestData = {
      equipmentId: selectedEquipment.id,
      market: selectedEquipment.market,
      type: selectedEquipment.type,
      text: selectedIssue,
      requestType: selectedRequest,
    };
    console.log(requestData);

    try {
      const response = await fetch(`http://localhost:3001/api/application`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log("Заявка отправлена успешно.");
      } else {
        console.error("Произошла ошибка при отправке заявки.");
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке заявки.", error);
    }

    setModalVisible(false);
  };

  const filteredData = data.filter((item) => item.market === selectedLocation);

  return (
    <div>
      {document.title === "Страница Диспетчера" ? (
        <ModalForDisp
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onPost={sendRequest}
          selectedEquipment={selectedEquipment}
          modalParameters={modalParameters}
          handleRequestChange={handleRequestChange}
        />
      ) : (
        <ModalForIT
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onPost={sendRequest}
          selectedEquipment={selectedEquipment}
          modalParameters={modalParameters}
          handleRequestChange={handleRequestChange}
        />
      )}

      <Tabs activeKey={activeTabKey} items={items} onChange={handleTabChange} />
      <Table
        columns={ColumnsForTable(handleOpenModal)}
        dataSource={filteredData}
      />
    </div>
  );
};

export default TableEquipment;
