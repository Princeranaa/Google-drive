const express = require('express');
const router = express.Router();
const userModel = require("../models/user_model");

// controllers
const {createUser, loginUser} = require("../controllers/user-Controller")


router.get('/test', (req, res) => {
    res.render("register")
})

router.post('/register', createUser)

router.get("/login", (req,res)=>{
    res.render("login")
})
router.post('/login', (req,res)=>{
    res.redirect("/home")
}, loginUser);





module.exports = router