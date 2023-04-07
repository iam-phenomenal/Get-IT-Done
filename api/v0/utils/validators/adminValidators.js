const { body } = require("express-validator");
const User = require("../../models/User");

const updateValidator = [
	body("username")
		.exists()
		.withMessage("Username is required")
		.custom((value) => {
			return User.findOne({ username: value }).then((user) => {
				if (!user) {
					return Promise.reject("Username not found");
				}
			});
		}),
	body("admin")
		.exists()
		.withMessage("Admin is required")
		.isBoolean()
		.withMessage("Admin should be boolean"),
];

const usernameValidator = [
	body("username")
		.exists()
		.withMessage("Username is string")
		.isString()
		.withMessage("Username should be of string type"),
];

module.exports = { updateValidator, usernameValidator };