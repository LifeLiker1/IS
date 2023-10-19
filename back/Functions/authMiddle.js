// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const secretKey = process.env.SECRET_KEY;

// function checkAuthentication(req, res, next) {
//   const token = localStorage.getItem("token");
//   console.log(token)
//   if (req.isAuthenticated()) {

//     if (token) {
//       // Если токен найден в локальном хранилище, установите его в объект запроса для будущего использования
//       req.token = token;

//       // Получите данные пользователя из req.user
//       const user = req.user;

//       console.log("User data received in authMiddleware:", user);

//       res.status(200).json({ message: "Авторизирован", token });
//       return next(); // Пользователь аутентифицирован, продолжаем выполнение следующего middleware
//     } else {
//       // Если токен не найден в локальном хранилище, отправьте 401 Unauthorized
//       res.status(401).send("Токен не найден в локальном хранилище.");
//     }
//   } else {
//     res.status(401).send("Пожалуйста, войдите в систему.");
//   }
// }

// checkAuthentication()

// module.exports = checkAuthentication;
