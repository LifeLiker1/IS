const { Router } = require("express");
const Employee = require("../Models/Employee");
const router = Router();
const passport = require("passport");
const authenticate = passport.authenticate("local", { session: false });

router.get("/api/employees/params", async (req, res) => {
  try {
    const { mobilePhone, position } = req.query;
    let query = {}; // По умолчанию, без фильтра

    if (mobilePhone) {
      query.mobilePhone = mobilePhone; // Добавьте фильтр по номеру телефона
    }

    if (position) {
      query.position = position; // Добавьте фильтр по должности
    }

    const employees = await Employee.find(query);

    if (employees.length > 0) {
      res.status(200).json(employees[0]); // Возвращаем первого найденного сотрудника
    } else {
      res.status(404).json({ message: "Сотрудник не найден" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
    console.log(error);
  }
});

router.get("/api/employees/onShift", async (req, res) => {
  try {
    const employee = await Employee.find({ onShift: true });
    res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Произошла ошибка при поиске сотрудников на смене" });
  }
});

router.post("/api/employees/updateOnShift", async (req, res) => {
  try {
    const mobilePhone = req.body.mobilePhone; // Переданный номер телефона

    // Ищем сотрудника по номеру телефона и обновляем статус onShift на true
    const updatedEmployee = await Employee.findOneAndUpdate(
      { mobilePhone: mobilePhone },
      { $set: { onShift: true } },
      { new: true } // Чтобы получить обновленный документ
    );

    if (!updatedEmployee) {
      // Если сотрудник с указанным номером телефона не найден
      return res.status(404).json({ error: "Сотрудник не найден" });
    }

    res.status(200).json({ message: "Поле onShift обновлено" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Произошла ошибка при обновлении поля onShift" });
  }
});
router.post("/api/employees/resetOnShift", async (req, res) => {
  try {
    const mobilePhone = req.body.mobilePhone; // Переданный номер телефона

    // Ищем сотрудника по номеру телефона и обновляем статус onShift на true
    const updatedEmployee = await Employee.findOneAndUpdate(
      { mobilePhone: mobilePhone },
      { $set: { onShift: false } },
      { new: true } // Чтобы получить обновленный документ
    );

    if (!updatedEmployee) {
      // Если сотрудник с указанным номером телефона не найден
      return res.status(404).json({ error: "Сотрудник не найден" });
    }

    res.status(200).json({ message: "Поле onShift обновлено" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Произошла ошибка при обновлении поля onShift" });
  }
});

router.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json("Сотрудник не найден");
    }
    res.status(200).json(employee);
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/employees", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json("Сотрудник не найден");
    }
    await Employee.deleteOne({ _id: req.params.id });
    res.status(200).json("Сотрудник уволен");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/employees", async (req, res) => {
  try {
    const employee = await Employee.find();
    if (!employee) {
      return res.status(404).json("Сотрудник не найден");
    }
    await Employee.deleteMany();
    res.status(200).json("Сотрудник уволен");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
