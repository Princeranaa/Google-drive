const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();


exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    //  if youser is match with the email or the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    // generate the toke for the user
    const token = jwt.sign(
      { email: user.email, userID: user.id },
      process.env.JWT_SECRET_KEY
    );

    // set the cookie with the token
    res.cookie("token", token);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};






// Array to store uploaded file details
const uploadedFiles = [];

// Upload File to Cloudinary
exports.uploadFile = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const file = req.files.file;
    const tempFilePath = file.tempFilePath;

    // Extract original file name without extension
    const originalFileName = file.name.split(".").slice(0, -1).join(".");
    const fileExtension = file.name.split(".").pop();

    // Upload to Cloudinary with specified public_id (original file name)
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "codehelp", // Folder in Cloudinary
      use_filename: false, // Don't automatically use original name
      public_id: originalFileName, // Use extracted original name
    });

    // Remove temporary file after upload
    fs.unlinkSync(tempFilePath);

    // Add file info to uploadedFiles array
    uploadedFiles.push({
      fileUrl: result.secure_url,
      fileName: `${originalFileName}.${fileExtension}`, // Show original file name with extension
    });

    // Redirect to home page to show updated list of uploaded files
    res.redirect("/");
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "File upload failed",
      error: error.message,
    });
  }
};

// Render Home Page
exports.renderHomePage = (req, res) => {
  res.render("home", { uploadedFiles });
};
