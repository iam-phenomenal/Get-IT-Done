const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		task: { type: String, required: true, max: 16 },
		desc: { type: String, default: "", max: 50 },
		weight: { type: Number, default: 1 },
		category: { type: String, default: "default", max: 16 },
		deadline: { type: Date },
		notification_method: { type: Number, default: 0 },
		status: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
