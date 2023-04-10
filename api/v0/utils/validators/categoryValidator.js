const {query, body} = require("express-validator")
const Task = require("../../models/Task")
//Update Category name
const updateCatValidator = [
    query("category").isString().withMessage("Query category should be a string")
    .custom((value, {req})=>{
        console.log(value)
        return Task.findOne({username: req.user.username, category: value}).then((result)=>{
            if(!result) return Promise.reject("Category not found");
            return true;
        })
    }),
    body("new_category").isString().withMessage("Category should be a string")
    .custom((value, {req})=>{
        return Task.findOne({username: req.user.username, category: value}).then((result)=>{
            if(result) return Promise.reject("Category name already in use");
            return true;
        })
    })
]

const categoryNameValidator = [
	query("category").custom((value, {req})=>{
		return Task.findOne({username: req.user.username, category: value}).then((result)=>{
            if(!result) return Promise.reject("Category not found");
            return true;
        })
	})
]

module.exports = {categoryNameValidator, updateCatValidator}