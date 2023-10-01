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
    name: {
      type: String, // Добавим поле для имени пользователя
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema); // Изменим имя модели на "User" с заглавной буквы
