const express = require("express");
const {userRegister} = require("../controllers/userRegister.controller")
const {userLogin} = require("../controllers/userLogin.controller");
const userRouter = express.Router();

userRouter.post("/register", userRegister)
userRouter.post("/login", userLogin)


module.exports = {
    userRouter
}