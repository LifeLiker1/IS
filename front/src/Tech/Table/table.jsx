import React, { useEffect, useState } from "react";
import { Tabs, Space, Table, Tag, Modal, Button } from "antd";
import { useCount } from "./CountContext";

const TableEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const { setCountNotWorking } = useCount();
  const [selectedLocation, setSelectedLocation] = useState("ADEM");
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  useEffect(() => {
    async function fetchData() {
      document.title = "Страница диспетчера";
      try {
        const response = await fetch("http://localhost:3001/api/equipment", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error(`Ошибка при получении данных: ${response.error} `);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Некорректный формат данных");
        }
        setEquipment(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (equipment.length === 0) {
      fetchData(); // Выполнять запрос, только если equipment пустой
    }
  }, [selectedLocation]);

  const data = equipment.map((item, index) => ({
    key: index.toString(),
    manufacturer: item.manufacturer,
    name: item.model,
    age: item._id,
    adress: item.adress,
    tag: item.tag,
  }));

  useEffect(() => {
    const count = equipment.reduce((count, item) => {
      if (item.tag && item.tag.toLowerCase() === "неисправно") {
        return count + 1;
      }
      return count;
    }, 0);
    setCountNotWorking(count); // Обновите значение countNotWorking
  }, [equipment]);

  const items = [
    {
      key: "1",
      label: "ADEM",
    },
    {
      key: "2",
      label: "Ялян",
    },
    {
      key: "3",
      label: "Алатау",
    },
  ];

  const handleTabChange = (key) => {
    setActiveTabKey(key);
    // Установите выбранное расположение на основе ключа вкладки
    if (key === "1") {
      setSelectedLocation("ADEM");
    } else if (key === "2") {
      setSelectedLocation("Ялян");
    } else if (key === "3") {
      setSelectedLocation("Алатау");
    }
  };
  
  console.log(selectedEquipment)
  
  const handleOpenModal = (record) => {
    setSelectedEquipment(record);
    setModalVisible(true);
  };
  const filteredData = data.filter((item) => item.adress === selectedLocation);
  
  const columns = [
    {
      title: "Модель",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Тип",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Расположение",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tag",
      dataIndex: "tag",
      render: (tag) => {
        if (tag) {
          let color;
          switch (tag.toLowerCase()) {
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
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        }
        return null;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href="#" onClick={handleOpenModal}>Выписать заявку</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Добавьте модальное окно */}
      <Modal
        title="Выписать заявку"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Закрыть
          </Button>,
          // <Button key="submit" type="primary" onClick={() => handleSubmit(selectedEquipment)}>
          //   Выписать заявку
          // </Button>,
        ]}
      >
        {selectedEquipment && (
          <div>
            <p>Модель: {selectedEquipment.model}</p>
            <p>Тип: {selectedEquipment.type}</p>
            <p>Расположение: {selectedEquipment.address}</p>
            <p>Тег: {selectedEquipment.tag}</p>
            {/* Добавьте другие данные оборудования, которые вам нужны */}
          </div>
        )}
      </Modal>

      <Tabs activeKey={activeTabKey} items={items} onChange={handleTabChange} />
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default TableEquipment;
