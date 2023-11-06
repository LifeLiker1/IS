import React, { useEffect, useState } from "react";
import "./auth.scss";
import { notification, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import HRheader from "../HR/Components/header/HRheader.jsx"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userNumber, setUserNumber] = useState(null);
  
  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      console.log(token);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  
  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Добавьте токен в заголовок
          "Content-Type": "application/json", // Установите тип контента, если необходимо
        },
        body: JSON.stringify({
          id:values._id,
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, user } = data;
        localStorage.setItem("token", token);
        const departament = user.departament;
        const role = user.role;
        setUserNumber(user.email)
        console.log(data)
        
        notification.open({
          message: "Авторизация успешна",
          duration: 3,
        });
        
        if (departament === "IT" || role === "IT_technician") {
          navigate("/it");
        } else if (
          departament === "Технический отдел" ||
          role === "technican"
        ) {
          navigate("/tech");
        } else if (departament === "HR") {
          navigate("/employees");
        }
      } else {
        notification.open({
          message: "Ошибка авторизации",
          duration: 3,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="wrapper">
          <HRheader message = {userNumber}/>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Почта"
          name="email"
          rules={[{ required: true, message: "Вы не ввели свою почту" }]}
        >
          <Input
            className="user-input"
            placeholder="Введите свою электронную почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Вы не ввели пароль!" }]}
        >
          <Input.Password
            type="password"
            placeholder="Введите Ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;
