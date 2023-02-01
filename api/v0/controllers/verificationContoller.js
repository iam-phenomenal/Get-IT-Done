const { createError } = require("../utils/createError")
const {generateToken, verifyToken} = require("../utils/user_verification_method/tokenization")
const User = require("../models/User")

const sendVerificationToken = async (req, res, next)=>{
    const {sms, email} = req.query
    const {user} = req.body.user
    try{
        if(sms){
        }else if(email){
            const accessToken = generateToken(user)
            
        }else{
            const error = createError(400, "SMS or Email is required")
            return next(error)
        }
    }catch(err){
        return next(err)
    }
}