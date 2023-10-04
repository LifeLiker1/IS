import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddEmployee } from "../../Functions/addEmployee";
import "./NewEmployee.scss";
import InputMask from "react-input-mask";

import { Button, Form, Input, TreeSelect } from "antd";
import ImageUpload from "../../Functions/ImageUpload"; // Импортируем компонент ImageUpload

function MyComponent() {
  const navigate = useNavigate();
  document.title = "Добавление нового сотрудника";

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    sex: "",
    address: { city: "", district: "", street: "" },
    mobilePhone: "",
    departament: "",
    position: "",
    about: "",
    hobbies: "",
    image: null,
  });

  const handleImageUpload = (imageFile) => {
    console.log(imageFile);
    setFormData({
      ...formData,
      image: imageFile,
    });
  };

  const [districts, setDistricts] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Устанавливаем заголовок для отправки JSON
        },
        body: JSON.stringify(formData), // Преобразуем объект formData в JSON
      });

      if (response.ok) {
        console.log("Сотрудник успешно добавлен");
      } else {
        console.error("Ошибка при добавлении сотрудника");
      }
    } catch (error) {
      console.error(error);
    }

    await AddEmployee(); // Отправляем данные в функцию AddEmployee

    // navigate("/employees");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCityChange = (value) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        city: value,
      },
      district: "", // Сбрасываем выбранный район при изменении города
    });

    const districtData = {
      Алматы: [
        { title: "Алатауский", value: "Алатауский" },
        { title: "Алмалинский", value: "Алмалинский" },
        { title: "Ауэзовский", value: "Ауэзовский" },
        { title: "Бостандыкский", value: "Бостандыкский" },
        { title: "Жетысуский", value: "Жетысуский" },
        { title: "Медеуский", value: "Медеуский" },
        { title: "Наурызбайский", value: "Наурызбайский" },
        { title: "Турксибский", value: "Турксибский" },
      ],
      Астана: [
        { title: "Район 1", value: "Район 1" },
        { title: "Район 2", value: "Район 2" },
        { title: "Район 3", value: "Район 3" },
      ],
      Шымкент: [
        { title: "Район A", value: "Район A" },
        { title: "Район B", value: "Район B" },
        { title: "Район C", value: "Район C" },
      ],
    };

    setDistricts(districtData[value] || []);
  };

  const handleDistrictChange = (value) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        district: value,
      },
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
                value: "Мужской",
              },
              {
                title: "Женский",
                value: "Женский",
              },
            ]}
            value={formData.sex}
            onChange={(value) => {
              setFormData({
                ...formData,
                sex: value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Город">
          <TreeSelect
            treeData={[
              {
                title: "Алматы",
                value: "Алматы",
              },
              {
                title: "Астана",
                value: "Астана",
              },
              {
                title: "Шымкент",
                value: "Шымкент",
              },
            ]}
            value={formData.address.city}
            onChange={handleCityChange}
          />
        </Form.Item>
        <Form.Item label="Район">
          <TreeSelect
            treeData={districts}
            value={formData.address.district}
            onChange={handleDistrictChange}
          />
        </Form.Item>
        <Form.Item label="Улица">
          <Input
            name="street"
            value={formData.address.street}
            onChange={handleChange}
          />
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
                value: "Технический отдел",
              },
              {
                title: "Юридический",
                value: "Юридический",
              },
            ]}
            value={formData.departament}
            onChange={(value) => {
              setFormData({
                ...formData,
                departament: value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Должность">
          <TreeSelect
            treeData={[
              {
                title: "Начальник отдела",
                value: "Начальник отдела",
              },
              {
                title: "Заместитель начальника отдела",
                value: "Заместитель начальника отдела",
              },
            ]}
            value={formData.position}
            onChange={(value) => {
              setFormData({
                ...formData,
                position: value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Изображение">
          <ImageUpload onImageUpload={handleImageUpload} />
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

export const CancelButton = () => (
  <Button className="Diss_employee" href="/employees">
    Отмена
  </Button>
);

export default MyComponent;
