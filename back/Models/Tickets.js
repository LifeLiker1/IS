const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  manufacturer: { type: String, required: false },
  model: { type: String, required: false },
  count: { type: Number, required: false },
  text: { type: String, required: false },
});

module.exports = mongoose.model("ticket", ticketSchema);
