// AddEquipmentForm.jsx
import React, { useState } from "react";
import { Form, Select } from "antd";
import Header from "../../../../Header/Header";
import OnField from "./Forms/OnField";
import InOffice from "./Forms/InOffice";
import OnWarehouse from "./Forms/OnWarehouse"
import "./addEquipment.scss";

// const { Option } = Select;

const AddEquipmentForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("В поле"); // Изначальное значение

  const onFinish = async (values) => {
    setLoading(true);

    try {
      console.log("Оборудование успешно добавлено в базу данных");
    } catch (error) {
      console.error("Ошибка при добавлении оборудования:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (value) => {
    setLocation(value);
  };
  


  return (
    <div>
      <Header />
      <div className="main-form">
        <Form.Item>
          <Select onChange={handleLocationChange} value={location}>
            <Select.Option value="В поле">В поле</Select.Option>
            <Select.Option value="В офисе">В офисе</Select.Option>
            <Select.Option value="На склад">На склад</Select.Option>
          </Select>
        </Form.Item>
        <Form form={form} onFinish={onFinish} layout="horizontal">
          {location === "В поле" && <OnField form={form} />}
          {location === "В офисе" && <InOffice form={form} />}
          {location === "На склад" && <OnWarehouse form={form} />}
        </Form>
      </div>
    </div>
  );
};

export default AddEquipmentForm;
