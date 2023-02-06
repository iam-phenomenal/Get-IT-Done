const { validationResult } = require("express-validator");
const Task = require("../models/Task");

//Get task within a category
const getCategoryTasks = async (req, res)=>{
    //Validate request
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    //Destruct request
    let {cat, status, limit, page} = req.query;
    const {username} = req.user;

    limit = parseInt(limit), page = parseInt(page); 
    const startIndex = (page - 1)* limit;

    let tasks
    try{
        if(completed){
            tasks = await Task.find({username: username, category: cat, status: status})
            .limit(limit).skip(startIndex);
        }else{
            tasks = await Task.find({username: username, category: cat})
            .limit(limit).skip(startIndex);
        }
        return res.status(200).json({
            message: "Category task found",
            output: tasks
        });
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}

//Update task category name
const updateCategory = async(req, res)=>{
    //Validate request
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    
    //Destruct request
    const {cat} = req.query;
    const {category} = req.body;
    const {username} = req.user;

    //Initializing tasks to store search result
    let tasks
    try{
        tasks = await Task.updateMany({username: username, category: cat}, {category: category});
        if(!tasks){
            return res.status(404).json({error: "Category not found"});
        }
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}

const deleteCategory = async (req, res)=>{
    //Validate request
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});

    //Destruct request
    const {cat} = req.query;
    const {username} = req.user;

    try{
        const categoryTasks = Task.deleteMany({username: username, category: cat});
        if(!categoryTasks){
            return res.status(404).json({error: "Category not found"});
        }
        return res.status(200).json({message: "Category has been deleted"});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}


module.exports = {getCategoryTasks, updateCategory, deleteCategory};