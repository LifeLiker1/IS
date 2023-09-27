import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddEmployee } from "../../Functions/addEmployee";
import "./NewEmployee.scss";
import InputMask from "react-input-mask";
import ImageUpload from "../../Functions/ImageUpload";

import { Button, Form, Input, TreeSelect } from "antd";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function MyComponent() {
  const navigate = useNavigate();

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
    image: "",
  });

  const handleImageUpload = (imageFile) => {
    setFormData({
      ...formData,
      image: imageFile,
    });
  };

  const [districts, setDistricts] = useState([]);

  const handleSubmit = async () => {
    const {
      name,
      surname,
      sex,
      address: { city, district, street },
      mobilePhone,
      departament,
      position,
      about,
      hobbies,
      image,
    } = formData;

    await AddEmployee(
      name,
      surname,
      sex,
      city,
      district,
      street,
      mobilePhone,
      departament,
      position,
      about,
      hobbies,
      image
    );
    navigate("/");
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
                value: "Tech_Department",
              },
              {
                title: "Юридический",
                value: "HR",
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
          <ImageUpload onChange={handleImageUpload} />
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
