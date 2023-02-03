const router = require("express").Router()
const {createTask, getTasks, updateTasks, deleteTasks} = require("../controllers/taskController")
const {tokenVerification} = require("../utils/tokenizer")
const{createTaskValidator, updateTaskValidator} = require("../utils/validators/taskValidators")

//Create task
router.post("/:userid", tokenVerification, createTaskValidator, createTask)

//Get task
router.get("/:userid", tokenVerification, getTasks)

//Update task
router.put("/:userid", tokenVerification, updateTaskValidator, updateTasks)

//Delete task
router.delete("/:userid", tokenVerification, deleteTasks)

module.exports = router