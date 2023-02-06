const jwt = require("jsonwebtoken");
require("dotenv").config();


const secret = process.env["JWT_SECRET_KEY"];
//Sign token after authentication
const signToken = (user)=>{
    const accessToken = jwt.sign(user, 
        secret, 
        {expiresIn: "6h"});
    return accessToken;
}

//Token authentication
const tokenAuthentication = (req, res, next)=>{
    //Get authorization header from request
    const authHeader = req.headers["authorization"];
    //If authorization header exist
    if(authHeader){
        //Split header to get token
        const tokenBearer = authHeader.split(" ");
        //Authorization header is malformed
        if(tokenBearer.length != 2){
            return res.status(401).json({
                error: "Malformed token"
            });
        }else{
            //Get token
            const token = tokenBearer[1];
            //Verify token
            return jwt.verify(token, secret, (err, decoded)=>{
                if(err){
                    return res.status(401).json({
                        error: "Authentication failed"
                    });
                }
                req.user = decoded;
                return next();
            })
        }
    }else{
        return res.status(401).json({
            error: "Missing authorization header"
        });
    }

}

//Verify token belongs to right user
const tokenVerification = (req, res, next) =>{
    tokenAuthentication(req, res, ()=>{
        if(req.user._id === req.params.userid) return next()
        else{
            return res.status(403).json({
                error: "Permission denied"
            });
        }
    })
}

//Admin verification
const adminVerification = (req, res, next) => {
    tokenAuthentication(req, res, ()=>{
        if((req.user._id === req.params.userid) && req.user.admin) return next();
        else{
            return res.status(403).json({
                error: "Permission denied"
            });
        }
    })
}

//Destroy token
const destroyToken = ()=>{

}

module.exports = {signToken, tokenVerification, adminVerification};