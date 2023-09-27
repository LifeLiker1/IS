const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  sex: { type: String, required: true },
  adress: {
    city: { type: String, required: true },
    district: { type: String, required: true },
    street: { type: String, required: false },
  },
  mobilePhone: { type: String, required: true, default: 0 },
  departament: { type: String, required: true },
  position: { type: String, required: true },
  about: { type: String, required: false },
  hobbies: { type: String, required: false },
  image: { type: Buffer, required: false },
});

const employee = mongoose.model("employee", employeeSchema);

module.exports = employee;
