const { tokenVerification } = require("../utils/tokenizer");
const {getCategoryTasks, updateCategory, deleteCategory} = require("../controllers/categoryController")
const {catNamevalidator, updateCatValidator} = require("../utils/validators/categoriesValidator")

const router = require("express").Router();

//Get all tasks
router.get("/:userid", tokenVerification, catNamevalidator, getCategoryTasks);

//Update category
router.put("/:userid", tokenVerification, updateCatValidator, updateCategory);

//Delete category
router.delete("/:userid", tokenVerification, catNamevalidator, deleteCategory);

module.exports = router