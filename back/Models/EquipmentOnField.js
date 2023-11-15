const mongoose = require("mongoose");

const equipmentOnFieldSchema = new mongoose.Schema({
  manufacturer: { type: String, required: false },
  model: { type: String, required: false },
  serialNumber: { type: String, required: false },
  invertNumber:{ type: String, required: false },
  type: {
    type: String,
    required: false,
    // paymentTerminal: { type: String, required: false },
    // accessEquipment: {
    //   entry: {  },
    //   barrier: { type: String, required: false },
    //   exit: { type: String, required: false },
    // },
  },
  adress: {
    type: String,
    required: false,
    // district: { type: String, required: false },
  },
  market: { type: String, required: false },

  tag: {
    type: String,
    required: false,
    // status:{ },
  },
  text: { type: String, required: false },
});

module.exports = mongoose.model("equipmentOnField", equipmentOnFieldSchema);
