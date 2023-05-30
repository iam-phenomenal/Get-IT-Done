const { tokenVerification } = require("../utils/tokenizer");
const {updateCategory, deleteCategory} = require("../controllers/categoryController")
const {categoryNameValidator, updateCatValidator} = require("../utils/validators/categoryValidator")

const router = require("express").Router();

router.get("/:userid/:category", (req, res)=>{
    req.query.category = req.params.category
    console.log("hello")
    res.redirect(`http://localhost:${4300}/api/v0/task/${req.params.userid}`)
})

//Update category
router.put("/:userid", tokenVerification, updateCatValidator, updateCategory);

//Delete category
router.delete("/:userid", tokenVerification, categoryNameValidator, deleteCategory);

module.exports = router