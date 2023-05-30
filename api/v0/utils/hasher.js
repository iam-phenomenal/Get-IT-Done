const bcrypt = require("bcrypt")

//Encrypt password
const hashPassword = async (password)=>{
    const saltRound = 10
    return await bcrypt.hash(password, 10)
}

//Verify password
const verifyPassword = async (password, hash)=>{
    password = password.toString()
    return await bcrypt.compare(password, hash)
}

module.exports = {hashPassword, verifyPassword}