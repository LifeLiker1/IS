const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  sex: { type: String, required: true },
  address: {
    city: { type: String, required: true },
    district: { type: String, required: true }
  },
  street: { type: String, required: true },
  mobilePhone: { type: String, required: true, default: 0 },
  departament: { type: String, required: true },
  position: { type: String, required: true },
  about: { type: String, required: false },
  hobbies: { type: String, required: false },
  // Добавляем поле для хранения идентификатора изображения
  image: { type: Schema.Types.ObjectId, ref: "Image", required: false}
});

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;