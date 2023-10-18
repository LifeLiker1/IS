import React, { useEffect, useState } from "react";
import { Tabs, Space, Table, Tag } from "antd";
import { useCount } from "./CountContext";

const TableEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const { countNotWorking, setCountNotWorking } = useCount();
  const [selectedLocation, setSelectedLocation] = useState("ADEM");
  const [activeTabKey, setActiveTabKey] = useState('1');

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
        console.log(data);
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
        key: '1',
        label: 'ADEM',
      },
      {
        key: '2',
        label: 'Ялян',
      },
      {
        key: '3',
        label: 'Алатау',
      },
    ];

  const handleTabChange = (key) => {
    setActiveTabKey(key);
    // Установите выбранное расположение на основе ключа вкладки
    if (key === '1') {
      setSelectedLocation("ADEM");
    } else if (key === '2') {
      setSelectedLocation("Ялян");
    } else if (key === '3') {
      setSelectedLocation("Алатау");
    }
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
          <a href="#">Выписать заявку</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Tabs activeKey={activeTabKey} items={items} onChange={handleTabChange} />
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default TableEquipment;
