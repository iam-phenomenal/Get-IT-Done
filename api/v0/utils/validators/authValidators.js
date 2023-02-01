const {body} = require("express-validator")
const User = require("../../models/User")

const registerValidators = [
    body("username").exists().withMessage("Username is required!")
        .custom((value)=>{
            return User.findOne({username: value}).then(user =>{
                if(user){
                    return Promise.reject("Username name already in use")
                }
            })
    }),
    body("email").exists().withMessage("Email is required!")
        .isEmail().withMessage("Please enter a valid email!")
        .custom( value =>{
            return User.findOne({email: value}).then(user =>{
                if(user){
                    return Promise.reject("Username name already in use")
                }
            })
        }),
    body("user_password").exists().withMessage("Password is required!")
        .isStrongPassword({
            minLowercase: 1,
            minLength: 8,
            minSymbols: 1,
            minNumbers: 1,
            minUppercase: 1
        }).withMessage("Minimum of 8 characters with"+
            "Lowercase, uppercase, symbol and number"),
    body("passwordConfiramation").custom((value, {req})=>{
        if(value !== req.body.password) throw new Error("Password confirmation does not match");
        return true;
    }),
]

const loginValidators = [
    body("username").exists().withMessage("Username is required")
        .isString().withMessage("Username should be a string"),
    body("user_password").exists().withMessage("Password is required!")
    .isLength({min: 8}).withMessage("Minimum: 8 characters")
]

module.exports = {registerValidators, loginValidators}