const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: false },
  surname: { type: String, required: false },
  lastName:{ type: String, required: false },
  dateOfBirth:{type: Date, required: false},
  sex: { type: String, required: false },
  address: {
    city: { type: String, required: false },
    district: { type: String, required: false },
  },
  street: { type: String, required: false },
  mobilePhone: { type: String, required: false, default: 0 },
  departament: { type: String, required: false },
  position: { type: String, required: false },
  about: { type: String, required: false },
  hobbies: { type: String, required: false },
  onShift: { type: Boolean, required: false, default: false }
});

module.exports = mongoose.model("employee", employeeSchema);
