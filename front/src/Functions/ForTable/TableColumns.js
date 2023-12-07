import React from "react";
import { Tag, Space } from "antd";

const ColumnsForTable = (handleOpenModal, pageType) => [
  {
    title: "Тип",
    dataIndex: "typeAndNumber",
    key: "typeAndNumber",
    render: (text, record) => `${record.type} № ${record.equipmentNumber}`,
  },
  {
    title: "Статус",
    dataIndex: "tag",
    key: "tag",
    render: (type) => {
      let color;
      let title;
  
      switch (type) {
        case false:
          title = "Неисправно";
          color = "error";
          break;
        case "заявка":
          title = "Заявка";
          color = "warning";
          break;
        case true:
          title = "В работе";
          color = "success";
          break;
        default:
          title = "Другой статус";
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
    dataIndex: "market",
    key: "market",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a href="#" onClick={() => handleOpenModal(record, pageType)}>
          {document.title === "Страница Диспетчера"
            ? "Выписать заявку"
            : "Изменить данные оборудования"}
        </a>
      </Space>
    ),
  },
];

export { ColumnsForTable };
