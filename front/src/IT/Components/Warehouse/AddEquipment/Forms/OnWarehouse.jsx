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
    MACadress: "",
    IPadress: "",
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
          <Form.Item name="description" label="Описание">
            <Input.TextArea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="serialNumber" label="Серийный номер">
            <Input.TextArea
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="invertNumber" label="Инвертарный номер">
            <Input.TextArea
              type="text"
              name="invertNumber"
              value={formData.invertNumber}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="MACadress" label="MAC-адресс">
            <Input.TextArea
              type="text"
              name="MACadress"
              value={formData.MACadress}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="IPadress" label="IP-adress">
            <Input.TextArea
              type="text"
              name="IPadress"
              value={formData.IPadress}
              onChange={handleChange}
            />
          </Form.Item>
        </>
      );
    } else if (formData.name === "Системный блок") {
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
          <Form.Item name="serialNumber" label="Серийный номер">
            <Input.TextArea
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="invertNumber" label="Инвертарный номер">
            <Input.TextArea
              type="text"
              name="invertNumber"
              value={formData.invertNumber}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="MACadress" label="MAC-адресс">
            <Input.TextArea
              type="text"
              name="MACadress"
              value={formData.MACadress}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="IPadress" label="IP-adress">
            <Input.TextArea
              type="text"
              name="IPadress"
              value={formData.IPadress}
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
      // Поиск документа в коллекции по имени и статусу
      const searchResponse = await fetch(
        "http://localhost:3001/api/warehouse/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            status: formData.status,
          }),
        }
      );

      if (!searchResponse.ok) {
        throw new Error("Ошибка при поиске оборудования");
      }

      const searchData = await searchResponse.json();

      // Если документ найден, обновляем его
      if (searchData.length > 0) {
        const existingDoc = searchData[0];
        const updateResponse = await fetch(
          `http://localhost:3001/api/warehouse/${existingDoc._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              $inc: { count: 1 }, // Используем оператор $inc для увеличения значения поля count на 1
            }),
          }
        );

        if (!updateResponse.ok) {
          throw new Error("Ошибка при обновлении существующего оборудования");
        }

        console.log("Существующее оборудование успешно обновлено");
      } else {
        // Если документ не найден, создаем новый
        const createResponse = await fetch(
          "http://localhost:3001/api/warehouse",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!createResponse.ok) {
          throw new Error("Ошибка при добавлении нового оборудования");
        }

        console.log("Новое оборудование успешно добавлено в базу данных");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main-form">
        <Form.Item name="name" label="Тип">
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
