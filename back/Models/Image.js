const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
  filename: String,
  contentType: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const ImageModel = mongoose.model("Image", imageSchema);

module.exports = ImageModel;
