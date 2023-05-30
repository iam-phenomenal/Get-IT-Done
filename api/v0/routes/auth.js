const router = require("express").Router()
const {register, login} = require("../controllers/authController")
const {registerValidators, loginValidators} = require("../utils/validators/authValidators")

router.post("/login",loginValidators, login)

router.post("/register",registerValidators, register)

module.exports = router