const bcrypt = require("bcrypt")

//Encrypt password
const hashPassword = async (password)=>{
    const saltRound = 10
    const genSalt = bcrypt.genSalt(saltRound)
    return await bcrypt.hash(password, genSalt)
}

//Verify password
const verifyPassword = async (password, hash)=>{
    password = password.toString()
    return await bcrypt.compare(password, hash)
}

module.exports = {hashPassword, verifyPassword}