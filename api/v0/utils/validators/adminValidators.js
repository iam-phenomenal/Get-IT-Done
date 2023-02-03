const {query, body} = require("express-validator")
const User = require("../../models/User")

const updateValidator = [
    query("username").exists().withMessage("Username is required").custom((value)=>{
        return User.findOne({username: value}).then(user =>{
            if(!user){
                return Promise.reject("Username not found");
            }
        })
    }),
    body("admin").exists().withMessage("Admin is required").isBoolean().withMessage("Admin should be boolean")
];

const usernameValidator = [
    query("username").exists().withMessage("Username is required").custom((value)=>{
        return User.findOne({username: value}).then(user =>{
            if(!user){
                return Promise.reject("Username not found");
            }
        })
    })
];

module.exports = {updateValidator, usernameValidator}