const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Employee = require("./Models/Employee");
const User = require("./Models/User.js")
const userRoutes = require("./routes/users");
const authRoutes = require('./Functions/auth')
const { specs, swaggerUi } = require("./Functions/swagger");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', userRoutes)
app.use('/', authRoutes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


const PORT = 3001;
const uri =
  "mongodb+srv://dbUser:HuaweiGT3@cluster0.qi0blxm.mongodb.net/AllEmployers";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

/**
 * @swagger
 * /api/employees
 * get:
 *     summary: Получить всех сотрудников
 *     description: Получить всех сотрудников
 *     tags:
 *       - Сотрудники
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       400:
 *         description: Некорректный запрос
 *       500:
 *         description: Ошибка сервера
*/
  app.get("/api/employees", async (req, res) => {
    try {
      const employee = await Employee.find();
      res.json(employee);
    } catch (error) {
      console.log(error);
    }
  });
  

  app.get("/api/employees/:id", async (req,res) => {
    try {
      const employee = await Employee.findById(req.params.id)
      if (!employee) {
        return res.status(404).json("Сотрудник не найден");
      }
      res.json(employee)
    } catch (error) {
      console.log(error)
    }
  })



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

  app.delete("/api/employees", async(req, res) => {
    try {
        const employee = await Employee.find()
        if (!employee){
            return res.status(404).json("Сотрудник не найден")
        }
        await Employee.deleteMany()
        res.status(200).json("Сотрудник уволен");
    } catch (error) {
        console.log(error);
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

