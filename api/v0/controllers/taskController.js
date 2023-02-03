const Task = require("../models/Task");
const {paginateResult} = require("../utils/pagination");
const {validationResult} = require("express-validator");

const createTask = async(req, res, next)=>{
    //Request validation check
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    //Destruct request body
    const {task_name, category, weight, desc, 
        deadline, notification_method} = req.body;
    const {username} = req.user;
    try{
        //Create new task model
        const newTask = new Task({
            username: username,
            task_name: task_name,
            desc: desc,
            weight: weight,
            category: category,
            deadline: deadline,
            notification_method: notification_method
        });
        //Save task
        const saveTask = await newTask.save();
        //Output saved task
        return res.status(201).json({
            message: "New Task has been created",
            output: saveTask
        });
    }catch(err){
        //Return error
        return res.status(500).json({error: err.message})
    }
}

const updateTasks = async(req, res, next)=>{
    //Validate request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    //Destruct request
    const {username} = req.user
    const {task} = req.query
    try{
        //Find task by username and task name
        const updatedTask = await Task.findOneAndUpdate({username: username, task_name: task}, {
            $set: req.body
        }, {new: true});
        //Task not updated due to invalid taskname
        if(!updatedTask){
            return res.status(422).json({error: "Task not found"})
        }
        //Task has successfully been updated
        return res.status(200).json({
            message: "Update successful", 
            taskInfo: updatedTask
        })
    }catch(err){
        //Output error
        return res.status(500).json({errror: err.message})
    }
}

const deleteTasks = async(req, res, next)=>{
    const {task} = req.query;
    const {username} = req.user;
    try{
        if(!task){
           return res.status(400).json({error: "Task is requied"});
        }else{
            const deletedTask = await Task.findOneAndDelete({username: username, task_name: task})
            if(!deletedTask){
                return res.status(422).json({error: "Task not found"});
            }
            return res.status(200).json({message: "Tasks deleted"})
        }
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

const getTasks = async(req, res, next)=>{
    try{
        let {task_name, category,completion, recent, limit, page} = req.query
        limit = parseInt(limit), page = parseInt(page)
        var startIndex = (page - 1)*limit;
        let tasks;
        if(task_name){   
            tasks = await Task.findOne({username: username, task_name: task_name});
        }else if(recent){
            tasks = await Task.find({username: username}).sort({$natural: -1})
            .select("task_name category status deadline").limit(limit).skip(startIndex);
        }else if(category){
            tasks = await Task.find({username: username, category: category})
            .select("task_name category status deadline").limit(limit).skip(startIndex);
        }else if(completion){
            tasks = await Task.find({username: username, status: completion})
            .select("task_name category status deadline").limit(limit).skip(startIndex);
        }else{
            tasks = await Task.find({username: username})
            .select("task_name category status deadline").limit(limit).skip(startIndex);
        }
        if(!tasks){
            return res.status(200).json({
                message: "No task found",
            });
        }
        return res.status(200).json({
            message: "Tasks found",
            output: tasks
        });
    }catch(err){
        return next(err);
    }
}

module.exports = {createTask, getTasks, updateTasks, deleteTasks}