const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true},
  sex: { type: String, required: true },
  adress: { type: String, required: true },
  mobilePhone: { type: Number, required: true, default: 0 },
  departament: { type: String, required: true },
//   images: { type: String, required: false },
});

const employee = mongoose.model("employee", employeeSchema);

module.exports = employee;