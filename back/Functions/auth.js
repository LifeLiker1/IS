const { Router } = require("express");
const UserModel = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./authMiddle");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const router = Router();

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await UserModel.findOne({ email });
    console.log(userExists)
    if (!userExists) {
      return res.status(400).json({ message: "Пользователь не найден!" });
    }
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Не верный пароль!" });
    }
    req.user = userExists;
    const token = jwt.sign({ userId: userExists.id, userName: userExists.email, userPassword: userExists.password }, secretKey, {
      expiresIn: "15min",
    });

    // Отправляем токен в заголовке ответа
    res.header("Authorization", `Bearer ${token}`).status(200).json({
      token,
      user: {
        ...userExists._doc,
        password: null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
