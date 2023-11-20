import { Tag, Space } from "antd";

const ColumnsForTable = (handleOpenModal, pageType) => [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Модель",
    dataIndex: "model",
    key: "model",
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Тип",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Статус",
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
