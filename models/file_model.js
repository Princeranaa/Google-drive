const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  filepath: { // Added this field to store the file's Cloudinary path
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("file", fileSchema);
