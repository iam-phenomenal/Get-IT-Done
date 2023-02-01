const User = require("../models/User")
const { createError } = require("../utils/createError")
const {hashPassword, verifyPassword} = require("../utils/hasher")
const {signToken} = require("../utils/tokenizer")
const {validationResult} = require("express-validator")

const login = async(req, res, next)=>{
    //Validate request body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    //Get request body
    const {email, user_password} = req.body
    try{
        //Search user's model by email
        const user = await User.findOne({email: email})
        //If user doesn't exist
        if(!user){
            //Create error
            const error = createError(401, "Invalid credentials")
            return next(error)
        }
        //Verify password
        const checkPassword = verifyPassword(user_password, user.password)
        //If password doesn't match
        if(!checkPassword){
            //Create error
            const error = createError(401, "Invalid credentials")
            return next(error)
        }
        //Destructing user credentials
        const {password, ...others} = user._doc
        //Assign token
        const accessToken = signToken(user)
        //Output succesful login
        return res.status(200).json({
            message: "Login successful",
            output: others,
            accessToken: accessToken
        })
    }catch(err){
        //Output error
        return next(err)
    }
}

const register = async(req, res, next)=>{
    //Validate request body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    //Get request body
    const {username, email, user_password} = req.body;
    let {admin} = req.body;
    //User is not admin
    if(!admin) admin = false;
    try{
        //Hash password
        const hashedPassword = await hashPassword(user_password);
        //Create new user model
        const newUser = new User({
            username: username,
            email:email,
            password: hashedPassword,
            admin: admin
        })
        //Save user
        const savedUser = await newUser.save();
        //Seperate password from user credentials
        const {password, ...others} = savedUser._doc;
        //Sign token
        const accessToken = signToken(savedUser);
        //Output result
        return res.status(201).json({
            message: "Registration successful",
            output: others,
            accessToken: accessToken
        });
    }catch(err){
        //Output error
        return next(err);
    }
}
module.exports = {register, login};