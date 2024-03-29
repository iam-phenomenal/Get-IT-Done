const Task = require("../models/Task");
// const {paginateResult} = require("../utils/pagination");
const {validationResult} = require("express-validator");

const createTask = async(req, res, next)=>{
    //Request validation check
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    //Destruct request body
    const {task, category, weight, desc, 
        deadline, notification_method} = req.body;
    const {username} = req.user;
    try{
        //Create new task model
        const newTask = new Task({
            username: username,
            task: task,
            desc: desc,
            weight: weight,
            category: category,
            deadline: new Date(deadline).toDateString(),
            notification_method: notification_method
        });
        //Save task
        const saveTask = await newTask.save();
        //Output saved task
        return res.status(201).json({
            message: `${task} has been created`,
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
        const updatedTask = await Task.findOneAndUpdate({username: username, task : task}, {
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
            const deletedTask = await Task.findOneAndDelete({username: username, task: task})
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
    let {task, category,completed, recent} = req.query
    
    try{
        const {username} = req.user
        let searchParams = {username: username}
        let tasks; 
        if(task){   
            searchParams.task = task
        }
        if(category){
            searchParams.category = category
        }
        if(completed){
            searchParams.completed = completed
        }

        tasks = await Task.find(searchParams).select("task category status deadline createdAt");
        const count = tasks.length
        return res.status(200).json({
            message: "Search Result",
            // count: count,
            output: tasks
        });
    }catch(err){
        return next(err);
    }
}

module.exports = {createTask, getTasks, updateTasks, deleteTasks}