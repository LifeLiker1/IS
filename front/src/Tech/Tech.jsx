import React, { useState } from "react";
import "./Tech.scss";
import Header from "./Header/TechHeader.jsx";
import { Progress, Space, Table, Tag } from "antd";

const Tech = () => {
  const [equipment, setEquipment] = useState([])

  const fetchData = async () => {
    document.title = "Страница диспетчера"
    try {
      const response = await fetch("http://localhost:3001/api/equipment")
      if (!response){
        throw new Error("Ошибка при получении данных");
      }
      const data = await response.json()
      setEquipment(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Расположение',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Выписать заявку</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "{equipment.id}",
      name: "",
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <div>
      <Header />
      <div className="main">
      <Table columns={columns} dataSource={data} />
        <div className="applications">

          <Space wrap>
            <Progress type="circle" percent={75} />
            <Progress type="circle" percent={70} status="exception" />
            <Progress type="circle" percent={100} />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Tech;
