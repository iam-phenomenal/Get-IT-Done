const {body} = require("express-validator")
const User = require("../../models/User")

const registerValidators = [
    body("username").exists().withMessage("Username is required!").custom(async(value)=>{
        const pattern = /^[a-zA-Z]([a-zA-Z0-9_-]{3,})[a-zA-Z0-9]$/
        const result = pattern.test(value)
        if(result){
            try{
                const user = await User.findOne({username: value});
                throw new Error("Username already exists");
            }catch(err){
                return true;
            }
        }else{
            throw new Error("Username does not match required pattern");
        }
    }),
    body("email").exists().withMessage("Email is required!")
        .isEmail().withMessage("Please enter a valid email!").custom(async(value)=>{
            try{
                const user = await User.findOne({email: value});
                throw new Error("Email already exists");
            }catch(err){
                return true;
            }
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