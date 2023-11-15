const mongoose = require("mongoose");

const equipmentInOffice = new mongoose.Schema({
  manufacturer: { type: String, required: false },
  model: { type: String, required: false },
  type: {
    type: String,
    required: false,
  },
  adress: {
    type: String,
    required: false,
  },
  MACadress: {
    type: String,
    required: false,
  },
  IPadress: {
    type: String,
    required: false,
  },
  tag: {
    type: String,
    required: false,
  },
  status: { type: String, required: false },
  text: { type: String, required: false },
});

module.exports = mongoose.model("equipmentInOffice", equipmentInOffice);
