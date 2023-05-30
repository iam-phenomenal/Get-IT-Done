const router = require("express").Router()
const {getUser, updateUser, deleteUser, getStats} = require("../controllers/userController")
const {tokenVerification} = require("../utils/tokenizer")
const { updateValidator } = require("../utils/validators/userValidators")

router.get("/:userid", tokenVerification, getUser)

router.put("/:userid", updateValidator, tokenVerification, updateUser)

router.delete("/:userid", tokenVerification, deleteUser)

router.get("/stats", tokenVerification, getStats)

module.exports = router