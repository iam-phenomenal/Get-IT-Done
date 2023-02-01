const Task = require("../models/Task")
const { createError } = require("../utils/createError")

const createTask = async(req, res, next)=>{
    //Extracting request body
    const {task_name, username, category, weight, desc, 
        deadline, notification_method, status} = req.body
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
        })
        //Save task
        const saveTask = await newTask().save()
        //Output saved task
        return res.status(201).json({
            message: "New Task has been created",
            output: saveTask
        }, ()=>{
            //Send Task schedule
        })
    }catch(err){
        //Return error
        return next(err)
    }
}

const updateTasks = async(req, res, next)=>{
    //Extracting request query
    const {task_name, category} = req.query
    //Extracting request body
    const {username, new_cat_name} = req.body
    let tasks
    try{
        //If user query by task name
        if(task_name){
            //Find task and update
            tasks = await Task.findOneAndUpdate({task_name: task_name, username: username}, 
                {$set: req.body}, {new: true})
        }else if(category){
            //Check if new category name exist
            //If new category name doesn't exist
            if(!new_cat_name){
                //Create error
                const error = createError(400, "new category name is required")
                //Return error
                return next(error)    
            }
            //Update category name for all task with the previous category name
            tasks = await Task.updateMany({username: username, category: category}, 
                {$set: {category: new_cat_name}}, {new: true}).select("task_name category").limit(5)
        }else{
            //Create error
            const error = create(400, "Task name or category is required")
            //Return error
            return next(error)
        }
        //Return updated task info
        return res.status(200).json({
            message: "Task updated",
            output: tasks 
        })
    }catch(err){
        //
        err.message = "Error updating task"
        return next(err)
    }
}

const deleteTasks = async(req, res, next)=>{
    const {task_name, category} = req.query
    try{
        if(task_name){
            await Task.findOneAndDelete({task_name: task_name, userid: userid})
        }else if(category){
            await Task.deleteMany({category: category, userid: userid})
        }else{
            const error = createError(400, "Task name or category is required")
            return next(error) 
        }
        return res.status(200).json({message: "Tasks deleted"})
    }catch(err){
        err.message = "Error deleting task"
        return next(err)
    }
}

const getTasks = async(req, res, next)=>{
    try{
        let {task_name, category, recent, limit, page} = req.query
        //Set pagination constraints
        const {paginationInfo, startIndex} = await paginateResult(User, parseInt(limit), parseInt(page));
        let tasks
        if(task_name){   
            tasks = await Task.findOne({username: username, task_name: task_name})
        }else if(recent){
            tasks = await Task.find({username: username}).sort({$natural: -1})
            .select("task_name status deadline").limit(limit).skip(startIndex)
        }else if(category){
            tasks = await Task.find({username: username, category: category})
            .select("task_name status deadline").limit(limit).skip(startIndex)
        }else{
            tasks = await Task.find({username: username})
            .select("task_name status deadline").limit(limit).skip(startIndex)
        }
        if(!tasks){
            return res.status(200).json({
                message: "No task found",
            })
        }
        return res.status(200).json({
            message: "Tasks found",
            output: tasks,
            others: results
        })
    }catch(err){
        return next(err)
    }
}

const completeTask = async(req, res, next)=>{

}

module.exports = {createTask, getTasks, updateTasks, deleteTasks, completeTask}