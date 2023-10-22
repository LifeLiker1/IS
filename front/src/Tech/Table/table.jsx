import React, { useEffect, useState } from "react";
import { Tabs, Space, Table, Tag, Modal, Button } from "antd";
import { useCount } from "./CountContext";
import { fetchData } from "./Functions/Responses";
import { items, locationMap } from "./Functions/ItemsForTable";

const TableEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const { setCountNotWorking } = useCount();
  const [selectedLocation, setSelectedLocation] = useState("ADEM");
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  // const item = {items}

  useEffect(() => {
    if (equipment.length === 0) {
      fetchData(selectedLocation, setEquipment);
    }
  }, [selectedLocation]);

  console.log(equipment)

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

  const handleTabChange = (key) => {
    setActiveTabKey(key);
    const selected = locationMap[key];
    if (selected) {
      setSelectedLocation(selected);
    }
  };

  const handleOpenModal = (selectedEquipment) => {
    setSelectedEquipment(selectedEquipment);
    setModalVisible(true);
  };
  const filteredData = data.filter((item) => item.adress === selectedLocation);
  console.log(selectedEquipment);

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
          <a href="#" onClick={handleOpenModal}>
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
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Закрыть
          </Button>,
        ]}
      >
        {selectedEquipment && (
          <div>
            <p>
              <p>Модель: {equipment.model}</p>
              <p>Тип: {selectedEquipment.type}</p>
              <p>Расположение: {selectedEquipment.adress}</p>
              <p>Тег: {selectedEquipment.tag}</p>
              
            </p>
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
