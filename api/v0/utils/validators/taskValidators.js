const { body, query } = require("express-validator");
const Task = require("../../models/Task");
const { dateChecker } = require("../checkDate");

const createTaskValidator = [
	//Verify userid and fetch username
	body("task")
		.exists()
		.withMessage("Task is required")
		.isLength({ min: 2, max: 20 })
		.withMessage("Minimum of 2 and maximum of 20 characters")
		.custom((value, { req }) => {
			return Task.findOne({
				username: req.user.username,
				task: value,
			}).then((task) => {
				if (task) {
					return Promise.reject("Task name already in use");
				}
			});
		}),
	body("desc")
		.optional({ checkFalsy: true })
		.isString()
		.withMessage("Task description should be of type string")
		.isLength({ min: 1, max: 50 }),
	body("weight")
		.optional({ checkFalsy: true })
		.isNumeric()
		.withMessage("Task weight should be a number"),
	body("category")
		.optional({ checkFalsy: true })
		.isString()
		.withMessage("Category should of type string")
		.isLength({ min: 1, max: 16 })
		.withMessage("Maximum of 16 characters allowed"),
	body("deadline")
		.optional({ checkFalsy: true })
		.isDate()
		.withMessage("Task deadline should be a valid date")
		.custom((value) => {
			const dateResult = dateChecker(value);
			if (!dateResult) {
				throw new Error("Deadline has passed");
			} else {
				return true;
			}
		}),
	body("notification_method")
		.optional({ checkFalsy: true })
		.isInt({ min: 0, max: 2 })
		.withMessage(
			"Notification method should a number {0: Email, 1: SMS, 2: Both}"
		),
];

const updateTaskValidator = [
	//Verify userid and fetch username
	query("task").exists().withMessage("Task name is required"),
	body("username").not().exists().withMessage("Username is immutable"),
	body("task")
		.optional({ checkFalsy: true })
		.isString()
		.withMessage("Task is required")
		.isLength({ min: 2, max: 20 })
		.withMessage("Minimum of 2 and maximum of 20 characters")
		.custom((value, { req }) => {
			return Task.findOne({
				username: req.user.username,
				task_name: value,
			}).then((task) => {
				if (task) {
					return Promise.reject("Task name already in use");
				}
			});
		}),
	body("desc")
		.optional({ checkFalsy: true })
		.isString()
		.withMessage("Task description should be of type string")
		.isLength({ min: 1, max: 50 }),
	body("weight")
		.optional({ checkFalsy: true })
		.isNumeric()
		.withMessage("Task weight should be a number"),
	body("category")
		.optional({ checkFalsy: true })
		.isString()
		.withMessage("Category should of type string")
		.isLength({ min: 1, max: 16 })
		.withMessage("Maximum of 16 characters allowed"),
	body("deadline")
		.optional({ checkFalsy: true })
		.isDate()
		.withMessage("Task deadline should be a valid date")
		.custom((value) => {
			const dateResult = dateChecker(value);
			if (!dateResult) {
				throw new Error("Deadline has passed");
			} else {
				return true;
			}
		}),
	body("notification_method")
		.optional({ checkFalsy: true })
		.isInt({ min: 0, max: 2 })
		.withMessage(
			"Notification method should a number {0: Email, 1: SMS, 2: Both}"
		),
];

// ask_name, category,completed, recent, limit, page
const getTaskValidator = [
	query("recent")
		.optional({ checkFalsy: true })
		.isAlpha()
		.withMessage("Recent should be boolean"),
	query("task")
		.optional({ checkFalsy: true })
		.isString()
		.withMessage("Task should be a string"),
	query("category")
		.optional({ checkFalsy: true })
		.isString()
		.withMessage("Category should be a string"),
	query("completed")
		.optional({ checkFalsy: true })
		.isString()
		.withMessage("Task should be a boolean"),
	query("limit")
		.optional({ checkFalsy: true })
		.isString()
		.withMessage("Limit should be a number"),
	query("page")
		.optional({ checkFalsy: true })
		.isNumeric()
		.withMessage("Page should be a number"),
];

module.exports = { createTaskValidator, updateTaskValidator, getTaskValidator };
