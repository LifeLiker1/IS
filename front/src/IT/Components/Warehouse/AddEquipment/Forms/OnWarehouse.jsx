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
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderAdditionalFields = () => {
    if (formData.name === "Другое") {
      return (
        <>
          <Form.Item name="standFor" label="Где устанавливается">
            <Input
              type="text"
              name="standFor"
              value={formData.standFor}
              onChange={handleChange}
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
        </>
      );
    }
    return null;
  };

  const onFinish = async () => {
    try {
      // Ваш код сохранения данных
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

        {renderAdditionalFields()}

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
