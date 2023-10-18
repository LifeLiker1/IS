const { Router } = require("express");
const Equipment = require("../Models/Equipment");
const authMiddleware = require("../Functions/authMiddle.js");
const mongoose = require("mongoose");
const conn = mongoose.connection;

const router = Router();

//запрос на все оборудование
router.get("/api/equipment", async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json(equipment);
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/equipment", async (req, res) => {
  try {
    const newEquipment = new Equipment(req.body);
    await newEquipment.save();
    res.status(200).json(newEquipment);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/equipment", async (req, res) => {
  try {
    const equipment = Equipment.find()
    if(!equipment){
      return res.status(404).json("Оборудование не найдено")
    }
    await Equipment.deleteMany()
    res.status(200).json("Оборудование удалено")
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
