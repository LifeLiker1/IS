import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewEmployee.scss";
import InputMask from "react-input-mask";
import { Button, Form, Input, TreeSelect, notification, DatePicker } from "antd";
import ImageUpload from "../../Functions/ImageUpload";
import TextArea from "antd/es/input/TextArea";
import {
  citySet,
  districtSet,
  employeeDepartment,
  employeeTitle,
} from "./Parameters";
import Calendars from "./calendar";
import FormItem from "antd/es/form/FormItem";

function MyComponent() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [showAuthNotification, setShowAuthNotification] = useState(false);
  document.title = "Добавление нового сотрудника";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setShowAuthNotification(true);
    }
  }, []);

  useEffect(() => {
    if (showAuthNotification) {
      notification.open({
        message: "Вы не авторизированы",
        duration: 3,
      });
    }
  }, [showAuthNotification]);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    sex: "",
    address: { city: "", district: "" },
    street: "",
    mobilePhone: "",
    departament: "",
    position: "",
    about: "",
    hobbies: "",
    image: null,
  });

  const handleImageUpload = async (imageFile) => {
    console.log(imageFile);
    setFormData({
      ...formData,
      image: imageFile,
    });
  };

  const [districts, setDistricts] = useState([]);

  const AddEmployee = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(response);
        console.log("Сотрудник успешно добавлен");
      } else {
        console.log(response);
        console.error("Ошибка при добавлении сотрудника");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await AddEmployee();

      navigate("/employees");
    } catch (error) {
      console.error(error);
    }
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
      district: "",
    });

    const districtData = districtSet;
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
      {token ? (
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
          <Form.Item label="Дата рождения">
              <Calendars/>
          </Form.Item>
          <Form.Item label="Город">
            <TreeSelect
              treeData={citySet}
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
            <TextArea
              rows={1}
              value={formData.address.street}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({
                  ...formData,
                  street: value,
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Телефон">
            <InputMask
              mask="+7 (999) 999-99-99"
              maskChar="*"
              name="mobilePhone"
              value={formData.mobilePhone}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Удаляем все символы, не являющиеся цифрами
                formData.mobilePhone = rawValue; // Обновляем значение в форме
                handleChange(e); // Вызываем обработчик изменения, если это необходимо
              }}
            >
              {(inputProps) => <Input {...inputProps} />}
            </InputMask>
          </Form.Item>
          <Form.Item label="Отдел">
            <TreeSelect
              treeData={employeeDepartment}
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
              treeData={employeeTitle}
              value={formData.position}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  position: value,
                });
              }}
            />
          </Form.Item>
          <Form.Item label="О себе :">
            <TextArea
              rows={4}
              value={formData.about}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({
                  ...formData,
                  about: value,
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Увличения :">
            <TextArea
              rows={2}
              value={formData.hobbies}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({
                  ...formData,
                  hobbies: value,
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Изображение">
            <ImageUpload onImageUpload={handleImageUpload} />
          </Form.Item>
          <div className="button-container">
            <Button
              type="primary"
              className="Add_employee"
              onClick={handleSubmit}
            >
              Добавить сотрудника
            </Button>
            <Button className="Diss_employee" href="/employees">
              Отмена
            </Button>
          </div>
        </Form>
      ) : null}
    </>
  );
}

export const CancelButton = () => (
  <Button className="Diss_employee" href="/employees">
    Отмена
  </Button>
);

export default MyComponent;

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ipsa labore, porro numquam, harum laborum mollitia ducimus, provident corrupti ut magni quas! Ratione sapiente dolorem tempore est. Temporibus, dolorem quia!
