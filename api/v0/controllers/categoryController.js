const {validationResult} = require("express-validator")
const Task = require("../models/Task")

const deleteCategory = async (req, res)=>{
    //Validate request
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});

    //Destruct request
    const {category} = req.query;
    const {username} = req.user;
    try{
        console.log(category)
        await Task.deleteMany({username: username, category: category});
        return res.status(200).json({message: "Category has been deleted"});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}

const updateCategory = async(req, res)=>{
    //Validate request
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    
    //Destruct request
    const {category} = req.query;
    const {new_category} = req.body;
    const {username} = req.user;

    //Initializing tasks to store search result
    try{
        const tasks = await Task.updateMany({username: username, category: category}, {category: new_category});
        if(!tasks){
            return res.status(404).json({error: "Category not found"});
        }
        return res.status(200).json({
            message: "Update successful"
        })
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}

module.exports = {updateCategory, deleteCategory}