import React, { useState } from "react";
import { Button, Form, Input, TreeSelect, notification, Space } from "antd";
import {
  statusSelect,
  marketSelect,
  equipmentType,
  fieldsStyle,
} from "./Parameters/Variables";
import "./Parameters/Forms.scss";
const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

const OnField = () => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="Large" onClick={() => api.destroy()}>
          Добавить
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => api.destroy(key)}
          href="/it/equipmentOnField"
        >
          Уйти
        </Button>
      </Space>
    );
    api.open({
      message: "Оборудование добавлено",
      description:
        "Оборудование успешно добавлено. Хотите добавить еще оборудование или перейти на главную страницу?",
      btn,
      key,
      onClose: close,
    });
  };

  const [formData, setFormData] = useState({
    manufacturer: "",
    model: "",
    adress: "",
    market: "",
    type: "",
    equipmentNumber: "",
    serialNumber: "",
    invertNumber: "",
    tag: "",
    text: "",
    additionalFieldForField: "",
  });
  const onFinish = async (values) => {
    openNotification();
    setLoading(true);

    try {
      // Отправка данных на сервер с использованием fetch
      const response = await fetch(
        "http://localhost:3001/api/equipmentOnField",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(formData);
      if (!response.ok) {
        throw new Error("Ошибка при добавлении оборудования");
      }

      // Если запрос успешен, вы можете добавить логику обработки успешного добавления
      console.log("Оборудование успешно добавлено в базу данных");
    } catch (error) {
      // Обработка ошибок
      console.error("Ошибка при добавлении оборудования:", error);
    } finally {
      setLoading(false);

      // formData.resetFields();
      console.log(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  return (
    <>
      {contextHolder}
      <div className="main-form">
        <Form onFinish={onFinish}>
          <Form.Item className="form-item" label="Производитель">
            <Input
              style={fieldsStyle}
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            className="form-item"
            name="model"
            label="Модель оборудования"
          >
            <Input
              style={fieldsStyle}
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item className="form-item" label="Серийный номер">
            <Input
              style={fieldsStyle}
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item className="form-item" name="market" label="Рынок">
            <TreeSelect
              treeData={marketSelect}
              style={fieldsStyle}
              value={formData.market}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  market: value,
                });
              }}
            />
          </Form.Item>
          <Form.Item className="form-item" name="adress" label="Адрес">
            <TreeSelect
              treeData={marketSelect}
              style={fieldsStyle}
              value={formData.adress}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  adress: value,
                });
              }}
            />
          </Form.Item>
          <Form.Item className="form-item" name="type" label="Тип">
            <TreeSelect
              treeData={equipmentType}
              style={fieldsStyle}
              value={formData.type}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  type: value,
                });
              }}
            />
          </Form.Item>
          <Form.Item className="form-item" label="Номер оборудования">
            <Input
              style={fieldsStyle}
              type="text"
              name="equipmentNumber"
              value={formData.equipmentNumber}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item className="form-item" label="Инвертарный номер">
            <Input
              style={fieldsStyle}
              type="text"
              name="invertNumber"
              value={formData.invertNumber}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item className="form-item" name="status" label="Статус">
            <TreeSelect
              style={fieldsStyle}
              treeData={statusSelect}
              value={formData.status}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  tag: value,
                });
              }}
            />
          </Form.Item>
          <Form.Item className="form-item" label="Описание">
            <Input.TextArea
              style={fieldsStyle}
              name="text"
              type="text"
              value={formData.text}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            className="form-item"
            name="additionalFieldForField"
            label="Дополнительно"
          >
            <Input
              style={fieldsStyle}
              name="additionalFieldForField"
              type="text"
              value={formData.additionalFieldForField}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={loading} onClick={onFinish}>
              Добавить оборудование
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default OnField;
