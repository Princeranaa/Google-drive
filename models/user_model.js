const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: [3, "Username must be at least 3 charcters"],
  },
  email: {
    type: String,
    required: true,
    trime: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, "Password must be at least 5 characters"],
  },
});

module.exports = mongoose.model("user", userSchema);
