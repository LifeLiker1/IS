import React, { useState } from "react";
import "./auth.scss";
import { notification } from "antd";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        notification.open({
          message: "Авторизация успешна",
          duration: 3,
        });
        window.location.href = "/employees";
      } else {
        notification.open({
          message: "Ошибка авторизации",
          duration: 3,
        });

        console.error(response.error);
      }
    } catch (error) {
      console.log(error);
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
          <input className="submit_btn" type="submit" value="Sign in" />
        </div>
      </form>
    </div>
  );
};

export default Auth;
