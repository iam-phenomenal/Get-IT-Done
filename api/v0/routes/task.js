const router = require("express").Router()
const {createTask, getTasks, updateTasks, deleteTasks} = require("../controllers/taskController")
const {tokenAuthentication} = require("../utils/tokenizer")

//Create task
router.post("", tokenAuthentication, createTask)

//Get task
router.get("", tokenAuthentication, getTasks)

//Update task
router.put("/:taskid", tokenAuthentication, updateTasks)

//Delete task
router.delete("/:taskid", tokenAuthentication, deleteTasks)

module.exports = router