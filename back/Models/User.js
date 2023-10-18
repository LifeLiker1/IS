const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String, // Изменим тип на String
      required: true,
    },
    departament: {
      type: String, // поле отдела пользователя
      required: true,
    },
    position: {
      type: String, // должность пользователя в отделе
      required: true,
    },
    role:{
      type: String, // роль пользователя в системе
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

