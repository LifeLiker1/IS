const { Router } = require("express");
const Employee = require("../Modules/Employee"); 
const authMiddleware = require ("../Functions/authMiddle.js");

const router = Router();


//запрос на всех сотрудников
router.get("/api/employees", authMiddleware, async (req, res) => {
  try {
    const employee = new Employee(req.body); 
    await employee.save(); 
    res.status(201).json(employee); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" }); 
  }
});

// запрос на данные конкретного сотрудника
router.get("/api/employees/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(400).json({ message: "Сотрудник не найден" });
    }
    res.json(employee); // Отправляем данные сотрудника в формате JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// фильтр сотрудников по отделам
router.get('/api/employees', authMiddleware, async (req, res) => {
  try {
    const { department } = req.query;

    if (!department) {
      return res.status(400).json({ message: 'Отдел не указан' });
    }

    const employees = await Employee.find({ department });

    res.json(employees);
  } catch (error) {
    console.error('Ошибка при запросе сотрудников:', error);
    res.status(500).json({ message: 'Ошибка запроса' });
  }
});


module.exports = router;
