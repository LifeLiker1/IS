import React, { useEffect, useState } from "react";
import { Tabs, Space, Table, Tag, Modal, Button, Select } from "antd";
import { useCount } from "./CountContext";
import { fetchData } from "./Functions/Responses";
// eslint-disable-next-line no-unused-vars
import {
  items,
  locationMap,
  optionsForBarriers,
  optionsForPOFs,
  ticketRemaining,
} from "./Functions/ItemsForTable";

const TableEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const { setCountNotWorking } = useCount();
  const [selectedLocation, setSelectedLocation] = useState("ADEM");
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalParameters, setModalParameters] = useState(null);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setEquipment(data); // Установите полученные данные в состояние родительского компонента
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (equipment.length === 0) {
      fetchData(selectedLocation, setEquipment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation]);

  const data = equipment.map((item, index) => ({
    key: index.toString(),
    name: item.model,
    type: item.type,
    address: item.adress,
    tag: item.tag,
  }));

  useEffect(() => {
    const count = equipment.reduce((count, item) => {
      if (item.tag && item.tag.toLowerCase() === "неисправно") {
        return count + 1;
      }
      return count;
    }, 0);
    setCountNotWorking(count);
  }, [equipment, setCountNotWorking]);

  const handleTabChange = (key) => {
    setActiveTabKey(key);
    const selected = locationMap[key];
    if (selected) {
      setSelectedLocation(selected);
    }
  };

  const handleOpenModal = (record) => {
    setSelectedEquipment(record);
    setModalVisible(true);
    if (selectedEquipment.type === "Платежный терминал") {
      setModalParameters(optionsForPOFs);
    } else if (
      selectedEquipment.type === "Стойка выезда" ||
      selectedEquipment.type === "Стойка въезда"
    ) {
      setModalParameters(optionsForBarriers);
    }
  };

  const handleRequestChange = (value) => {
    setSelectedRequest(value);
  };

  const sendRequest = async () => {
    const requestData = {
      equipmentId: selectedEquipment.id,
      requestType: selectedRequest,
    };

    try {
      const response = await fetch(`/api/equipment/${selectedEquipment.id}`, {
        method: "PUT",
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

  const filteredData = data.filter((item) => item.address === selectedLocation);

  const columns = [
    {
      title: "Модель",
      dataIndex: "name",
      key: "name",
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Тип",
      dataIndex: "tag",
      key: "tag",
      render: (type) => {
        let color;
        switch (type.toLowerCase()) {
          case "неисправно":
            color = "error";
            break;
          case "заявка":
            color = "warning";
            break;
          case "в работе":
            color = "success";
            break;
          default:
            color = "geekblue";
        }
        return (
          <Tag color={color} key={type}>
            {type.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Расположение",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href="#" onClick={() => handleOpenModal(record)}>
            Выписать заявку
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title="Выписать заявку"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="post" type="primary" onClick={sendRequest}>
            Выписать заявку
          </Button>,
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Закрыть
          </Button>,
        ]}
      >
        {selectedEquipment && (
          <div>
            <p>Модель: {selectedEquipment.name}</p>
            <p>Тип: {selectedEquipment.type}</p>
            <p>Расположение: {selectedEquipment.address}</p>
            <p>Статус: {selectedEquipment.tag}</p>
            Выписать заявку на:
            <Select
              defaultValue=""
              style={{ width: 250 }}
              options={modalParameters}
              onChange={handleRequestChange}
            /><br/>
            Поломка:
            <Select
              defaultValue=""
              style={{ width: 250 }}
              options={modalParameters}
              onChange={handleRequestChange}
            />
          </div>
        )}
      </Modal>

      <Tabs activeKey={activeTabKey} items={items} onChange={handleTabChange} />
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default TableEquipment;
