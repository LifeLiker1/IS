const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
<<<<<<< HEAD
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
=======
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
>>>>>>> back
});

const employee = mongoose.model("employee", employeeSchema);

module.exports = employee;
