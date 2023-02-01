const router = require("express").Router()
const {getUser, updateUser, deleteUser, getStats} = require("../controllers/userController")
const {tokenAuthentication} = require("../utils/tokenizer")
const { updateValidator } = require("../utils/validators/userValidators")

router.get("/", tokenAuthentication, getUser)

router.put("/", updateValidator, tokenAuthentication, updateUser)

router.delete("/", tokenAuthentication, deleteUser)

router.get("/stats", tokenAuthentication, getStats)

module.exports = router