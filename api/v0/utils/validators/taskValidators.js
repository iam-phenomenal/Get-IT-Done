const {body, param} = require("express-validator")
const User = require("../../models/User")

const createTaskValidator = [
    //Verify userid and fetch username
    param("userid").custom(async (value, {req})=>{
        await User.findById(value, (err, doc)=>{
            if(err){
                throw new Error("Invalid userid");
            }else{
                req.body.username = doc.username;
            }
        })
    }),
    body("task_name").exists().withMessage("Task name is required")
        .isLength({min: 2, max: 20}).withMessage("Minimum of 2 and maximum of 20 characters"),
    body("desc").isString().withMessage("Task description should be of type string")
        .isLength({min: 1, max:50}),
    body("weight").isNumeric().withMessage("Task weight should be a number"),
    body("category").isString().withMessage("Category should of type string")
        .isLength({min: 1, max: 16}).withMessage("Maximum of 16 characters allowed"),
    body("deadline").isDate().withMessage("Task deadline should be a valid date")
        .custom((value)=>{
            const currentDate = new Date();
            if(value < currentDate){
                throw new Error("Deadline has passed");
            }else{
                return true;
            }
        }),
    body("notification_method").isInt({min: 0, max:2})
        .withMessage("Notification method should a number {0: Email, 1: SMS, 2: Both}")
]

const updateTaskValidator = [
    body("task_name").exists().withMessage("Task name is required")
        .isLength({min: 2, max: 20}).withMessage("Minimum of 2 and maximum of 20 characters"),
    body("desc").isString().withMessage("Task description should be of type string")
        .isLength({min: 1, max:50}),
    body("weight").isNumeric().withMessage("Task weight should be a number"),
    body("category").isString().withMessage("Category should of type string")
        .isLength({min: 1, max: 16}).withMessage("Maximum of 16 characters allowed"),
    body("deadline").isDate().withMessage("Task deadline should be a valid date")
        .custom((value)=>{
            const currentDate = new Date();
            if(value < currentDate){
                throw new Error("Deadline has passed");
            }else{
                return true;
            }
        }),
    body("notification_method").isInt({min: 0, max:2})
        .withMessage("Notification method should a number {0: Email, 1: SMS, 2: Both}")
]

module.exports = {createTaskValidator, updateTaskValidator}