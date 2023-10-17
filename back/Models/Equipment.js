const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  manufacturer: { type: String, required: false },
  model: { type: String, required: false },
  type: {
    paymentTerminal: { type: String, required: false },
    accessEquipment: {
      entry: { type: String, required: false },
      barrier: { type: String, required: false },
      exit: { type: String, required: false },
    },
  },
  address: {
    city: { type: String, required: false },
    district: { type: String, required: false },
  },
  breaking: { type: String, required: false },
});

module.exports = mongoose.model("equipment", equipmentSchema);


