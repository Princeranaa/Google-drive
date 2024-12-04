const express = require("express");
const app = express();
const path = require("path");
const cookieparser = require("cookie-parser");

// routes
const userRouter = require("./routes/userRoutes");
const indexRouter = require("./routes/indexRouter")
// set the views pages for the rendering on the server side
app.set("view engine", "ejs");

//middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use("/", indexRouter);
app.use("/user", userRouter);

// file upload cloudinary
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


// connect to cloudinari folder 
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();




app.get("/", (req, res) => {
  res.render("index");
});


// connect to databse 
const Db = require("./config/database")
Db.ConnectToDb()



require("dotenv").config();
const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
