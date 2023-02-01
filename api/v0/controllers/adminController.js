const Task = require("../models/Task");
const User = require("../models/User");
const { createError } = require("../utils/createError");

const getAllUser = async(req, res, next)=>{
    //Destruct request query
    const {username, recent, limit, page} = req.query;
    try{
        //Set pagination constraints
        const {paginationInfo, startIndex} = await paginateResult(User, parseInt(limit), parseInt(page));
        //Initialize users to hold search result
        let users
        //Search by username
        if(username){   
            users = await User.findOne({username: username}).select("username email");
        }
        //Search by recency
        else if(recent){
            users = await User.find().sort({$natural: -1}).select("username email").limit(limit).skip(startIndex);
        }
        else{
            users = await User.find().select("username email").limit(limit).skip(startIndex);
        }
        if(!users){
            const error = createError(400, "User not found");
            return next(error);
        }
        return res.status(200).json({
            message: "Users found",
            output: users,
            others: paginationInfo
        });
    }catch(err){
        return next(err);
    }
}

const revokeUser = async (req, res, next)=>{
    //Destruct request query
    const {username} = req.query
    try{
        //Find and delete user
        await User.findOneAndDelete({username: username})
        return res.status(200).json({message: "User access has been revoked"})
    }catch(err){
        const error = createError(500, "User revokation failed")
        return next(error)
    }
}

const deleteUserTasks = async(req, res, next)=>{

}

const updatePermission = async (req, res, next)=>{
    //Destruct request
    const {username} = req.query
    const {admin} = req.body
    try{
        //Update user admin status 
        const user = User.findOneAndUpdate({username: username}, {admin: admin});
        return res.status(200).json({
            message: "Permission update successful",
            output: user
        });
    }catch(err){
        const error = createError(500, "User permission update failed");
        return next(error);
    }
}

module.exports = {getAllUser, revokeUser, updatePermission};