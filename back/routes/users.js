const express = require("express");
const router = express.Router();
const User = require("../Modules/User"); // Подставьте правильный путь к модели пользователя

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(400).json({ message: "Сотрудники не найдены" });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: "Сотрудник не найден" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
