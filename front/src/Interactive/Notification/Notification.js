import { notification } from "antd";

const authSucces = 
 notification.open({
          message: "Авторизация успешна",
          duration: 1.5,
          placement: "top", // Здесь указываем положение
        });

const authFailed = 
notification.open({
    message: "Ошибка авторизации",
    duration: 3,
  });

export {authSucces, authFailed}