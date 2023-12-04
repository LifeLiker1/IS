import React, { useState } from "react";
import { Form, Input, Button, TreeSelect } from "antd";
import Loader from "../../../../../Interactive/Loader/Loader";
import { statusSelect, equipmentOptions } from "./Parameters/Variables";

import "./Parameters/Forms.scss";

const OnWarehouse = () => {
  const [componentEnabled, setComponentEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    standFor: "",
    description: "",
    serialNumber: "",
    invertNumber: "",
    status: "",
  });

  const handleEquipmentChange = (value) => {
    const selectedEquipment = equipmentOptions.find(
      (equipment) => equipment.value === value
    );

    if (selectedEquipment) {
      setFormData({
        ...formData,
        name: selectedEquipment.value,
        standFor: selectedEquipment.standFor,
        description: selectedEquipment.description,
      });
      console.log(selectedEquipment)
    }
  };

  const onFinish = async (values) => {
    try {
      // Отправка данных на сервер с использованием fetch
      const response = await fetch("http://localhost:3001/api/warehouse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      if (!response.ok) {
        throw new Error("Ошибка при добавлении оборудования");
      }

      // Если запрос успешен, вы можете добавить логику обработки успешного добавления
      console.log("Оборудование успешно добавлено в базу данных");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
      <div className="main-form">
        <Form.Item name="name" label="Название">
          <TreeSelect
            treeData={equipmentOptions.map((option) => ({
              label: option.name,
              value: option.value,
            }))}
            value={formData.name}
            onChange={(value) => handleEquipmentChange(value)}
          />
        </Form.Item>
        <Form.Item name="standFor" label="Где устанавливается">
          <Input
            type="text"
            name="standFor"
            value={formData.standFor}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item name="status" label="Статус">
          <TreeSelect
            treeData={statusSelect}
            value={formData.status}
            onChange={(value) => {
              setFormData({
                ...formData,
                status: value,
              });
            }}
          />
        </Form.Item>
        <Form.Item name="description" label="Описание">
          <Input.TextArea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={loading} onClick={onFinish}>
            Добавить оборудование
          </Button>
        </Form.Item>
      </div>
    </>
  );
};

export default OnWarehouse;
