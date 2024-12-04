const mongoose = require("mongoose");
require("dotenv").config()
exports.ConnectToDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB");
  }
};
