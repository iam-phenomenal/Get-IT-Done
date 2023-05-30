const { query, body } = require("express-validator");

//Get stats name
const getStatsValidator = [
    query("start")
		.optional({ checkFalsy: false })
		.isDate()
		.withMessage("Start should be of type date"),
	query("end")
		.optional({ checkFalsy: false })
		.isDate()
		.withMessage("End should be of type date"),
	query("filter")
		.optional({ checkFalsy: true })
		.isString()
		.withMessage("Filter should be a string")
		.custom((value, { req }) => {
			if (value == "custom") {
				//Check for start and end
				const { start, end } = req.query;
				if (start === undefined && end === undefined) {
					throw new Error("START or END is required");
				}
                return true
			} else if (value != "today") {
				throw new Error(
					"TODAY || YESTERDAY || MONTH || YEAR is required"
				);
			}
            return true
		}),
];

module.exports = { getStatsValidator };
