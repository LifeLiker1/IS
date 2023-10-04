const { Router } = require("express");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const router = Router();

/**
 * @swagger
 * /api/register:
 *   get:
 *     summary: Регистрация нового сотрудника
 *     description: Регистрация нового сотрудника
 *     tags:
 *       - Пользователи
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Некорректный запрос
 *       500:
 *         description: Ошибка сервера
 */
router.post("/api/register", async (req, res) => {
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
