const { Router } = require("express");
const Warehouse = require("../Models/Warehouse");
const authMiddleware = require("../Functions/authMiddle.js");
const mongoose = require("mongoose");
const conn = mongoose.connection;

const router = Router();
//все оборудование
router.get("/api/warehouse", async (req, res) => {
  try {
    const { status } = req.query;
    let query = {}; // По умолчанию, без фильтра

    if (status !== undefined) {
      // Если параметр status указан, добавляем фильтр по статусу
      query.status = status.toLowerCase() === "true"; // Преобразуем строку в булево значение
    }

    const warehouse = await Warehouse.find(query);
    res.status(200).json(warehouse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

//фильтр оборудования по стаутусу
router.post("/api/warehouse", async (req, res) => {
  try {
    const newWarehouse = new Warehouse(req.body);
    await newWarehouse.save();
    res.status(200).json(newWarehouse);
  } catch (error) {
    console.log(error);
  }
});

// Роут для поиска документа в коллекции по имени и статусу
router.post("/api/warehouse/search", async (req, res) => {
  try {
    const { name, status } = req.body;

    // Поиск документа по имени и статусу
    const existingWarehouse = await Warehouse.findOne({ name, status });

    if (existingWarehouse) {
      // Если документ найден, возвращаем его
      res.status(200).json([existingWarehouse]);
    } else {
      // Если документ не найден, возвращаем пустой массив
      res.status(200).json([]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Произошла ошибка при поиске оборудования");
  }
});



router.delete("/api/warehouse/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWarehouse = await Warehouse.findByIdAndDelete(id);

    if (!deletedWarehouse) {
      return res.status(404).json("Оборудование не найдено");
    }

    res.status(200).json("Оборудование удалено");
  } catch (error) {
    console.log(error);
    res.status(500).json("Произошла ошибка при удалении оборудования");
  }
});

// PUT-запрос для обновления данных по ID
router.put("/api/warehouse/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Проверяем, существует ли оборудование с указанным ID
    const existingWarehouse = await Warehouse.findById(id);
    if (!existingWarehouse) {
      return res.status(404).json("Оборудование не найдено");
    }

    // Увеличиваем счетчик count на 1
    existingWarehouse.count += 1;

    // Сохраняем обновленные данные
    const updatedWarehouse = await existingWarehouse.save();

    res.status(200).json(updatedWarehouse);
  } catch (error) {
    console.log(error);
    res.status(500).json("Произошла ошибка при обновлении оборудования");
  }
});

module.exports = router;
