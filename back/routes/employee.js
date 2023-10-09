const { Router } = require("express");
const Employee = require("../Modules/Employee");
const authMiddleware = require("../Functions/authMiddle.js");
const multer = require("multer"); // Добавлен импорт модуля multer для обработки form-data
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const conn = mongoose.connection;
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

// Добавьте другие маршруты здесь, если необходимо

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
    const { departament } = req.query;

    if (!departament) {
      return res.status(400).json({ message: 'Отдел не указан' });
    }

    const employees = await Employee.find({ departament });

    res.json(employees);
  } catch (error) {
    console.error('Ошибка при запросе сотрудников:', error);
    res.status(500).json({ message: 'Ошибка запроса' });
  }
});

// Маршрут для создания нового сотрудника
router.post("/api/employees", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    // Проверяем, есть ли файл (изображение) в запросе
    const image = req.file ? req.file.buffer : undefined;

    // Создаем нового сотрудника, включая изображение, если оно есть
    const newEmployee = new Employee({
      ...req.body,
      image,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.delete("/api/employees/:id", authMiddleware, async(req, res) => {
  try {
      const employee = await Employee.findById(req.params.id)
      if (!employee){
          return res.status(404).json("Сотрудник не найден")
      }
      await Employee.deleteOne({ _id: req.params.id})
      res.status(200).json("Сотрудник уволен");
  } catch (error) {
      console.log(error);
  }
});

module.exports = router;
