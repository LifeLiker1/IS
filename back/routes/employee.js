const { Router } = require("express");
const Employee = require("../Models/Employee");
const router = Router();
const authMiddleware = require("../Functions/authMiddle")

router.get("/api/employees", async (req, res) => {
  try {
    const employee = await Employee.find();
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
    console.log(error);
  }
});


router.get("/api/employees/:id", async (req,res) => {
  try {
    const employee = await Employee.findById(req.params.id)
    if (!employee) {
      return res.status(404).json("Сотрудник не найден");
    }
    res.status(200).json(employee)
  } catch (error) {
    console.log(error)
  }
})



router.post("/api/employees", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    console.log(error);
  }
});



router.delete("/api/employees/:id", async(req, res) => {
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

router.delete("/api/employees", async(req, res) => {
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


module.exports = router;
