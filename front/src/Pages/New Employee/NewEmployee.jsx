import React, { useState } from "react";
import { AddEmployee } from "../../Functions/addEmployee";
import { PlusOutlined } from "@ant-design/icons";
import "./NewEmployee.scss";
import InputMask from "react-input-mask"; // Импортируйте InputMask из библиотеки

import {
  Button,
  DatePicker,
  Form,
  Input,
  // Radio,
  TreeSelect,
  Upload,
} from "antd";
import { redirect } from "react-router-dom";

// const { RangePicker } = DatePicker;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function MyComponent({ citiesData, districtsData }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    sex: "",
    adress: "",
    mobilePhone: "",
    departament: "",
    city: "", // Добавляем состояние для выбранного города
    district: "", // Добавляем состояние для выбранного района
  });

  const handleSubmit = async () => {
    const {
      name,
      surname,
      sex,
      adress,
      mobilePhone,
      departament,
      city,
      district, // Добавляем район в отправляемые данные
    } = formData;

    await AddEmployee(
      name,
      surname,
      sex,
      adress,
      mobilePhone,
      departament,
      city,
      district
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Form
        className="main_form"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Имя">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Фамилия">
          <Input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Пол">
          <TreeSelect
            treeData={[
              {
                title: "Мужской",
                value: "male",
              },
              {
                title: "Женский",
                value: "female",
              },
            ]}
            value={formData.sex}
          >
            onChange=
            {(value) => {
              setFormData({
                ...formData,
                sex: value,
              });
            }}
          </TreeSelect>
        </Form.Item>
        <Form.Item label="Адрес">
          <TreeSelect
            treeData={[
              {
                title: "Алматы",
                value: "Almaty",
              },
              {
                title: "Астана",
                value: "Astana",
              },
              {
                title: "Шымкент",
                value: "Shymkent",
              },
            ]}
            value={formData.adress} // Устанавливаем значение для TreeSelect
            onChange={(value) => {
              setFormData({
                ...formData,
                adress: value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Мобильный телефон">
          <InputMask
            mask="+7 (999) 999-99-99"
            maskChar="*"
            name="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleChange}
          >
            {(inputProps) => <Input {...inputProps} />}
          </InputMask>
        </Form.Item>
        <Form.Item label="Отдел">
          <TreeSelect
            treeData={[
              {
                title: "IT",
                value: "IT",
              },
              {
                title: "Технический отдел",
                value: "Tech_Department",
              },
              {
                title: "Юридический",
                value: "HR",
              },
            ]}
            value={formData.departament} // Устанавливаем значение для TreeSelect
            onChange={(value) => {
              setFormData({
                ...formData,
                departament: value,
              });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
      <Button className="Add_employee" onClick={handleSubmit}>
        Добавить сотрудника
      </Button>
      <Button className="Diss_employee" href="/">
        Отмена
      </Button>
    </>
  );
}

export const AddEmployeeButton = () => (
  <Button className="Add_employee">Добавить сотрудника</Button>
);

export const CancelButton = () => (
  <Button className="Diss_employee" href="/">
    Отмена
  </Button>
);
export default MyComponent;
