const bcrypt = require("bcrypt")

const saltRound = 10
//Encrypt password
const hashPassword = async (password)=>{
    return await bcrypt.hash(password, saltRound)
}

//Verify password
const verifyPassword = async (password, hash)=>{
    password = password.toString()
    return await bcrypt.compare(password, hash)
}

module.exports = {hashPassword, verifyPassword}