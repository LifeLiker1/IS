const { Router } = require("express");
const Employee = require("../Modules/Employee"); // Импорт модели сотрудника из БД

const router = Router();

router.post("/api/employees", async (req, res) => {
  try {
    const employee = new Employee(req.body); // Создаем экземпляр сотрудника на основе данных из тела запроса
    await employee.save(); // Сохраняем сотрудника в базе данных
    res.status(201).json(employee); // Отправляем успешный ответ с созданным сотрудником
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" }); // Отправляем ошибку сервера в случае исключения
  }
});

router.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params._id)
    if (!employee){
        return res.status(400).json({message: "сотрудник не найден"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" }); // Отправляем ошибку сервера в случае исключения
  }
});

module.exports = router;
