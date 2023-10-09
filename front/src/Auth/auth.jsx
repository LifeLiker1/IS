import React, { useEffect, useState } from "react";
import "./auth.scss";
import { notification, Button } from "antd";
import { useNavigate } from "react-router-dom"; // Импортируйте useNavigate из react-router-dom

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate(); // Используйте useNavigate для перенаправления

  useEffect(() => {
    // При монтировании компонента проверяем, есть ли токен в localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        localStorage.setItem("token", token);
        const Departament = data.user.departament;
        console.log(data);
        console.log(Departament);
        notification.open({
          message: "Авторизация успешна",
          duration: 3,
        });

        if (Departament === "IT") {
          navigate("/employees");
        } else if (Departament === "Технический отдел") {
          navigate("/employees");
        } else if (Departament === "HR") {
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
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="user-input"
            type="email"
            name="email"
            id="email"
            placeholder="Введите вашу почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
