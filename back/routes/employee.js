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

// Загрузка сотрудника в формате form-data
router.post("/api/employees", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      surname,
      sex,
      // Добавьте остальные поля
    } = req.body;

    // Создайте запись сотрудника
    const newEmployee = new Employee({
      name,
      surname,
      sex,
      // Добавьте остальные поля с данными сотрудника
    });

    if (req.file) {
      // Если есть загруженное изображение, сохраните его в GridFS
      const gfs = Grid(conn.db);
      const writeStream = gfs.createWriteStream({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });
      writeStream.write(req.file.buffer);
      writeStream.end();

      writeStream.on("close", (file) => {
        // Свяжите сотрудника с идентификатором изображения в GridFS
        newEmployee.image = file._id;
        newEmployee.save(); // Сохраните данные сотрудника

        res.status(201).json(newEmployee);
      });
    } else {
      // Если изображение не было загружено, сохраните сотрудника без изображения
      await newEmployee.save();
      res.status(201).json(newEmployee);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Загрузка изображения в GridFS
router.post("/api/upload-image", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Файл не загружен" });
    }

    const gfs = Grid(conn.db);
    const writeStream = gfs.createWriteStream({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    writeStream.write(req.file.buffer);
    writeStream.end();

    writeStream.on("close", (file) => {
      res.status(201).json({ _id: file._id });
    });
  } catch (error) {
    console.error("Ошибка при загрузке изображения:", error);
    res.status(500).json({ error: "Ошибка сервера при загрузке изображения" });
  }
});

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

app.post("/api/employees", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/employees/:id", async(req, res) => {
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
