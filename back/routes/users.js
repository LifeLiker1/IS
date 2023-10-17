const { Router } = require("express");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const router = Router();

router.post("/api/register", async (req, res) => {
  try {
    const { email, password, departament, position } = req.body;
    if (!email) {
      return res.status(401).json({ message: "Необходим email " });
    }
    if (!password) {
      return res.status(402).json({ message: "Необходим пароль" });
    }
    if (!departament) {
      return res.status(403).json({ message: "Необходим отдел " });
    }
    if (!password) {
      return res.status(404).json({ message: "Необходима должность" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(405)
        .json({ message: "Пользователь с таким email уже существует" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      departament: departament,
      position: position,
    });

    await newUser.save();

    res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});


router.get("/api/users", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
    console.log(error);
  }
});

router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
    console.log(error);
  }
});

router.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      if (!user){
          return res.status(404).json("Сотрудник не найден")
      }
      await User.deleteOne({ _id: req.params.id})
      res.status(200).json("Сотрудник удален");
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
    console.log(error);
  }
});


module.exports = router;
