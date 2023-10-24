const { Router } = require("express");
const Ticket = require("../Models/Tickets");
const authMiddleware = require("../Functions/authMiddle.js");
const mongoose = require("mongoose");
const conn = mongoose.connection;

const router = Router();

router.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/tickets/decrease", async (req, res) => {
  try {
    // Найти талоны и уменьшить значение
    await Ticket.updateMany({}, { $inc: { count: -4000 } });
    res.status(200).json({ message: "Значение уменьшено" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка при уменьшении значения" });
  }
});

router.post("/api/tickets/reset", async (req, res) => {
  try {
    // Найти талоны и сбросить значение
    await Ticket.updateMany({}, { $set: { count: 1000000 } });
    res.status(200).json({ message: "Значение сброшено" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка при сбросе значения" });
  }
});

module.exports = router;
