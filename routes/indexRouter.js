const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const {
    uploadFile,
    renderHomePage,
  
} = require("../controllers/user-Controller");

// Enable file upload middleware
router.use(fileUpload({ useTempFiles: true }));

// Home page route
router.get("/", renderHomePage);

// File upload route
router.post("/upload",uploadFile);

// Store file details route
// router.post("/store-file", storeFileDetails);

module.exports = router;
