const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Employee = require("./Modules/Employee");
const User = require("./Modules/User.js")
const userRoutes = require("./routes/users"); // Подключаем файл с маршрутами для авторизации
const authRoutes = require('./auth')
const app = express();
app.use(cors());
app.use(express.json());

app.use('/', userRoutes)
app.use('/', authRoutes)


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


  // app.get("/api/users", async (req, res) => {
  //   try {
  //     const users = await User.find();
  //     if (!users || users.length === 0) {
  //       return res.status(400).json({ message: "Сотрудники не найдены" });
  //     }
  //     res.json(users);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Ошибка сервера" });
  //   }
  // });
  
  // app.get("/api/users/:id", async (req, res) => {
  //   try {
  //     const user = await User.findById(req.params.id);
  //     if (!user) {
  //       return res.status(400).json({ message: "Сотрудник не найден" });
  //     }
  //     res.json(user);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Ошибка сервера" });
  //   }
  // });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

