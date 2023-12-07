const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    model:{ type: String, required: false },
    type:{ type: String, required: false },
    equipmentNumber: { type: Number, required: false },
    market:{ type: String, required: false },
    text:{ type: String, required: false },
    techName:{type: String, required: false}
});

module.exports = mongoose.model("application", applicationSchema);
