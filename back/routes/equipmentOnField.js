const { Router } = require("express");
const Equipment = require("../Models/EquipmentOnField");
const authMiddleware = require("../Functions/authMiddle.js");
const mongoose = require("mongoose");
const conn = mongoose.connection;

const router = Router();

//запрос на все оборудование
router.get("/api/equipmentOnField", async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json(equipment);
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/equipmentOnField", async (req, res) => {
  try {
    const newEquipment = new Equipment(req.body);
    await newEquipment.save();
    res.status(200).json(newEquipment);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/equipmentOnField/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEquipment = await Equipment.findByIdAndDelete(id);

    if (!deletedEquipment) {
      return res.status(404).json("Оборудование не найдено");
    }

    res.status(200).json("Оборудование удалено");
  } catch (error) {
    console.log(error);
    res.status(500).json("Произошла ошибка при удалении оборудования");
  }
});

// PUT-запрос для обновления данных по ID
router.put("/api/equipmentOnField/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { tag, text } = req.body;

    // Проверяем, существует ли оборудование с указанным ID
    const existingEquipment = await Equipment.findById(id);
    
    if (!existingEquipment) {
      // Если оборудование не найдено, создаем новый документ
      const newEquipment = await Equipment.create({
        tag: tag,
        text: text,
      });

      res.status(200).json(newEquipment);
    } else {
      // Если оборудование найдено, обновляем поля tag и text
      existingEquipment.tag = tag;
      existingEquipment.text = text;

      // Сохраняем обновленные данные
      const updatedEquipment = await existingEquipment.save();

      res.status(200).json(updatedEquipment);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Произошла ошибка при обновлении оборудования");
  }
});


module.exports = router;
