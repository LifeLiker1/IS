const { Router } = require("express");
const User = require("../Modules/users"); // Импорт модели сотрудника из БД

const router = Router();

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) { // Проверяем, что массив пользователей не пустой
      return res.status(400).json({ message: "Сотрудники не найдены" });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" }); // Отправляем ошибку сервера в случае исключения
  }
});

router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Используем req.params.id, а не req.params._id
    if (!user) {
      return res.status(400).json({ message: "Сотрудник не найден" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" }); // Отправляем ошибку сервера в случае исключения
  }
});

module.exports = router;
