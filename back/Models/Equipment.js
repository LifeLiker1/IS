const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  manufacturer: { type: String, required: false },
  model: { type: String, required: false },
  type: {type: String, required: false
    // paymentTerminal: { type: String, required: false },
    // accessEquipment: {
    //   entry: {  },
    //   barrier: { type: String, required: false },
    //   exit: { type: String, required: false },
    // },
  },
  adress: {type: String, required: false 
    // city: { },
    // district: { type: String, required: false },
  },
  tag: { type: String, required: false
    // status:{ },
    
  },
});

module.exports = mongoose.model("equipment", equipmentSchema);


