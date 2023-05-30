const { getUser} = require("../controllers/userController")
const {getAllUser, revokeUser, updatePermission}=
    require("../controllers/adminController");
const {adminVerification} = require("../utils/tokenizer")
const {updateValidator, usernameValidator} = require("../utils/validators/adminValidators")

const router = require("express").Router()

//Fetch admin profiles
router.get("/:userid",adminVerification, getUser)

//Fetch other users
router.get("/:userid/users",adminVerification, getAllUser)

//Update user permission
router.put("/:userid/users", updateValidator, adminVerification, updatePermission)

//Revoke user
router.delete("/:userid/users", usernameValidator, adminVerification, revokeUser)

module.exports = router