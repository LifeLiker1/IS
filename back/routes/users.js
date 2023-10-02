const { Router } = require("express");
const User = require("../Modules/User");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../Functions/authMiddle.js");
const router = Router();

router.post("/api/register", authMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Необходимы email " });
    }
    if (!password) {
      return res.status(400).json({ message: "Необходимы пароль" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email уже существует" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
module.exports = router;
