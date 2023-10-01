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

router.get('/api/employees', async (req, res) => {
  try {
    const { department } = req.query; // Получаем значение отдела из запроса

    // Выполняем запрос к базе данных, фильтруя сотрудников по выбранному отделу
    const employees = await Employee.find({ department });

    res.json(employees); // Отправляем список сотрудников в формате JSON
  } catch (error) {
    console.error('Ошибка при запросе сотрудников:', error);
    res.status(500).json({ message: 'Ошибка запроса' });
  }
});

module.exports = router;
