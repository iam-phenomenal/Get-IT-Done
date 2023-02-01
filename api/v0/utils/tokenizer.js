const jwt = require("jsonwebtoken")
const { createError } = require("./createError")
require("dotenv").config()

const signToken = (user)=>{
    const accessToken = jwt.sign({
        id: user._id,
        admin: user.admin
    }, process.env["JWT_SECRET_KEY"], {expiresIn: "1h"})
    return accessToken
}

const tokenResult = (req, res, next)=>{
    const authHeader = req.headers["authorization"]
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
            if(err){
                const error = createError(401, "Authentication failed")
                return next(error)
            }
            req.user = user
            return next()
        })
    }else{
        const error = createError(401, "Authentication failed")
        return next(error)
    }
}

const tokenAuthentication = (req, res, next) =>{
    this.tokenResult(req, res, ()=>{
        if(req.user.id === req.params.userid) return next()
        else{
            const error = createError(401, "Authentication failed")
            return next(error)
        }
    })
}

const adminVerification = (req, res, next) => {
    this.tokenResult(req, res, ()=>{
        if((req.user.id === req.params.userid) && req.user.admin) return next()
        else{
            const error = createError(403, "Permission denied")
            return next(error)
        }
    })
}

module.exports = {signToken, tokenResult, tokenAuthentication, adminVerification}