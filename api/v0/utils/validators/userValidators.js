const {body, param} = require("express-validator")
const User = require("../../models/User")

//User update request validators
const updateValidator = [
    //Ensure username can't be changed
    body("username").not().exists().withMessage("Username is immutable"),
    //Ensure password is strong
    body("user_password").optional({checkFalsy: true}).isStrongPassword({
        minLowercase: 1,
        minLength: 8,
        minSymbols: 1,
        minNumbers: 1,
        minUppercase: 1
    }).withMessage("Minimum of 8 characters with"+
        "Lowercase, uppercase, symbol and number"),
    //Ensure email is valid and doesn't exist
    body("email").optional({checkFalsy: true}).isEmail().withMessage("Please enter a valid email!").custom(async(value)=>{
        try{
            const user = await User.findOne({email: value});
            throw new Error("Email already exists");
        }catch(err){
            return true;
        }
    }),
    body("admin").optional({checkFalsy: true}).custom(()=> {
        throw new Error("Admin status is immutable")
    })
]
module.exports = {updateValidator}