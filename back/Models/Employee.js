const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: { type: String, required: false },
  surname: { type: String, required: false },
  sex: { type: String, required: false },
  address: {
    city: { type: String, required: false },
    district: { type: String, required: false },
    street: { type: String, required: false },
  },
  mobilePhone: { type: String, required: false, default: 0 },
  department: { type: String, required: false },
  position: { type: String, required: false },
  about: { type: String, required: false },
  hobbies: { type: String, required: false },
  // Добавляем поле для хранения идентификатора изображения
  image: { type: Schema.Types.ObjectId, ref: "Image", required: false}
});

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;