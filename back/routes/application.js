//роуты для заявок
const { Router } = require("express");
const Application = require("../Models/application");
const authMiddleware = require("../Functions/authMiddle.js");
const mongoose = require("mongoose");
const conn = mongoose.connection;

const router = Router();

//запрос на все заявки
router.get("/api/application", async (req, res) => {
  try {
    const application = await Application.find();
    res.status(200).json(application);
  } catch (error) {
    console.log(error);
  }
});

// Роут для поиска заявок по рынку
router.get("/api/applications/byMarket", async (req, res) => {
  try {
    const market = req.query.market;

    // Ищем заявки по указанному рынку
    const applications = await Application.find({ market: market });

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Произошла ошибка при поиске заявок по рынку" });
  }
});


router.post("/api/application", async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    await newApplication.save();
    res.status(200).json(newApplication);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/application", async (req, res) => {
  try {
    const application = Application.find()
    if(!application){
      return res.status(404).json("Оборудование не найдено")
    }
    await application.deleteMany()
    res.status(200).json("Оборудование удалено")
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
