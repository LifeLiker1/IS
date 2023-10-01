import React, { useState } from "react";
import { ToastContainer } from "react-toastify"
import "./auth.scss";
import {notification} from "antd"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

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
        notification.open({
          message:'Авторизация успешна',
          duration: 3,
        })
        // Обработайте успешный ответ от сервера, например, перенаправьте пользователя на другую страницу
        window.location.href = "/"; // Пример перенаправления
      } else {
        notification.open({
          message:'Ошибка авторизации',
          duration: 3,
        }); // Изменил сообщение на сообщение об ошибке

        // Обработайте ошибку авторизации, например, показав сообщение об ошибке
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
