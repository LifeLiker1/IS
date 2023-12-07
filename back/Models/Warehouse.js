const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: false }, //название
  standFor: { type: String, required: false }, //где стоит
  description: { type: String, required: false }, // описание
  serialNumber: { type: String, required: false },
  invertNumber: { type: String, required: false },
  MACadress: { type: String, required: false },
  IPadress: { type: String, required: false },
  status: { type: Boolean, required: false },
  count: { type: Number, required: false, default: 1 }, //кол-во оборудования
});

module.exports = mongoose.model("Warehouse", warehouseSchema);
//название, где стоит, для чего оно, спецификация(описание)
