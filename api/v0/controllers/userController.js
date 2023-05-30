const User = require("../models/User");
const Task = require("../models/Task");
const { createError } = require("../utils/createError");
const { hashPassword } = require("../utils/hasher");
const {validationResult} = require("express-validator");

//Get indie user
const getUser = async (req, res, next)=>{
    //Destruct request params
    const {userid} = req.params;
    
    try{
        //Get user from database
        const user = await User.findById(userid);
        //If no user was found
        if(!user){
            //Create bad request error
            const error = createError(400, "User not found");
            //Send error
            return next(error);
        }
        //Destruct user
        const {password, ...others} = user._doc
        return res.status(200).json({
            message: "User Profile",
            userInfo: others
        })
    }catch(err){
        //Send internal server error
        err.message = "Error fetching user profile"
        return next(err.message)
    }
}

const updateUser = async(req, res, next)=>{
    //Destruct request params
    const {userid} = req.params;
    //Validate request body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    try{
        //If password is to be updated
        if(req.body.user_password){
            //Hashpassword
            const hashedPassword = await hashPassword(req.body.user_password)
            //Update request password body
            req.body.password = hashedPassword
        }
        //Find user and update
        const user = await User.findByIdAndUpdate(userid, {$set: req.body}, {new: true})
        if(!user){
            const error = createError(400, "Invalid request body")
            return next(error)
        }
        //Destruct user credential
        const {password, ...others} = user._doc
        //Output user info
        return res.status(200).json({
            message: "Update successful",
            output: others
        })
    }catch(err){
        err.message = "Error updating user profile"
        return next(err)
    }
}

const deleteUser = async(req, res, next)=>{
    //Destructing user
    const {userid} = req.params;
    try{
        //Search and delete user by id
        await User.findByIdAndDelete(userid);
        //Delete user's tasks
        await Task.deleteMany({username: req.user.username})
        //Output success
        return res.status(200).json({
            message: "User has been deleted"
        })
    }catch(err){
        err.message = "Error deleting user profile";
        return next(err);
    }
}

const getStats = async(req, res, next)=>{
    const {userid} = req.params
    const {completed, uncompleted, year, month, week} = req.query
}
module.exports = {getUser, updateUser, deleteUser, getStats}