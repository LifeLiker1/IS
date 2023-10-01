const { Router } = require("express");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth"); // Создайте middleware для проверки JWT токена
const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await UserModel.findOne({ email });

    if (!userExists) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is not valid!" });
    }

    const token = jwt.sign({ userId: userExists.id }, "test", {
      expiresIn: "15min",
    });

    res.status(200).json({
      token,
      user: {
        ...userExists._doc,
        password: null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Пример защищенного маршрута, который требует JWT токена
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "You have access!" });
});

module.exports = router;
