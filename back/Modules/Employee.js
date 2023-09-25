const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: false },
  surname: { type: String, required: false },
  sex: { type: String, required: false },
  adress: { type: String, required: false },
  mobilePhone: { type: String, required: false, default: 0 },
  departament: { type: String, required: false },
  position: { type: String, required: false },
  about: { type: String, required: false },
  hobbies: { type: String, required: false },
  //   images: { type: String, required: false },
});

const employee = mongoose.model("employee", employeeSchema);

module.exports = employee;
