const { getUser} = require("../controllers/userController")
const {getAllUser, revokeUser, updatePermission, adminRegister}=
    require("../controllers/adminController");
const {adminVerification} = require("../utils/tokenizer")
const {} = require("../utils/validators/userValidators")

const router = require("express").Router()

//Fetch admin profiles
router.get("/:userid",adminVerification, getUser)

//Fetch other users
router.get("/users",adminVerification, getAllUser)

//Update user permission
router.put("/users", adminVerification, updatePermission)

//Revoke user
router.delete("/users", adminVerification, revokeUser)

//Register account
router.post("/auth", adminRegister)

module.exports = router