const {query, body} = require("express-validator")
const Task = require("../../models/Task")

const catNamevalidator = [
    query("cat").exists().withMessage("Category is required!").isString().withMessage("cat should be a string")
    .custom((value, {req})=>{
        return Task.findOne({username: req.user.username, category: value}).then((result)=>{
            if(!result) return Promise.reject("Category not found");
            return true;
        })
    }),
    query("status").optional({checkFalsy: true}).isBoolean().withMessage("Status should be a boolean")
]

const updateCatValidator = [
    query("cat").exists().withMessage("Query category is required!")
    .isString().withMessage("Query category should be a string")
    .custom((value, {req})=>{
        return Task.findOne({username: req.user.username, category: value}).then((result)=>{
            if(!result) return Promise.reject("Category not found");
            return true;
        })
    }),
    body("category").exists().withMessage("Category is required!")
    .isString().withMessage("Category should be a string")
    .custom((value, {req})=>{
        return Task.findOne({username: req.user.username, category: value}).then((result)=>{
            if(result) return Promise.reject("Category name already in use");
            return true;
        })
    })
]

module.exports = {catNamevalidator, updateCatValidator}