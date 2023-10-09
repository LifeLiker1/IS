import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewEmployee.scss";
import InputMask from "react-input-mask";
import { Button, Form, Input, TreeSelect, notification } from "antd";
import ImageUpload from "../../Functions/ImageUpload"; // Импортируем компонент ImageUpload
import TextArea from "antd/es/input/TextArea";

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
  }, []); // Уберите зависимость, чтобы этот эффект выполнялся только один раз

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
          "Content-Type": "application/json", // Установите заголовок Content-Type на application/json
        },
        body: JSON.stringify(formData), // Преобразуйте объект formData в JSON и отправьте его
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
      await AddEmployee(); // Отправляем данные в функцию AddEmployee

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
    <>{token ? (<Form
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
    </Form>) : (null)}
      
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
