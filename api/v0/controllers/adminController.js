const Task = require("../models/Task");
const User = require("../models/User");
const { validationResult } = require("express-validator");

const getAllUser = async (req, res, next) => {
	//Destruct request query
	let { username, recent, limit, page } = req.query;
	const startIndex = (page - 1) * limit;
	try {
		//Initialize users to hold search result
		let users;
		//Search by username
		if (username) {
			users = await User.findOne({ username: username }).select(
				"username email admin"
			);
		}
		//Search by recency
		else if (recent) {
			users = await User.find()
				.sort({ $natural: -1 })
				.select("username email admin")
				.limit(limit)
				.skip(startIndex);
		}
		//Get all users
		else {
			users = await User.find()
				.select("username email admin")
				.limit(limit)
				.skip(startIndex);
		}
		const count = users.length;
		return res.status(200).json({
			message: "Users found",
			count: count,
			output: users,
		});
	} catch (err) {
		return res.status(500).json({ error: "Error fetching users" });
	}
};

const revokeUser = async (req, res) => {
	//Validating user request
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array() });
	}
	//Destruct request query
	const { username } = req.query;
	try {
		//Find and delete user
		const user = await User.findOneAndDelete({ username: username });
		const userTask = await Task.deleteMany({ username: username });
		if (!userTask) {
			return res
				.status(200)
				.json({ message: "User has been deleted with no tasks found" });
		} else {
			return res
				.status(200)
				.json({ message: "User and user's tasks has been deleted" });
		}
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

const updatePermission = async (req, res) => {
	//Validating user request
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array() });
	}
	//Destruct request
	const { username, admin } = req.body;
	try {
		//Update user admin status
		const user = await User.findOneAndUpdate(
			{ username: username },
			{ admin: admin },
			{ new: true }
		);
        if(user === null) return res.status(400).json({error: "User not found"})
		return res.status(200).json({
			message: "Permission update successful",
			output: user,
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

module.exports = { getAllUser, revokeUser, updatePermission };
