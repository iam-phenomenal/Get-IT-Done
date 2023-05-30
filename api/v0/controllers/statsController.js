const {validationResult} = require("express-validator")
const Task = require("../models/Task");

const getStats = async (req, res) => {
    //Check for inpute errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});

	//Get query from request
	const {filter} = req.query;
	const username = "userPass2";

	try {
        //Date object
        const dateObj = new Date()

		//Find Item by username and deadline
		const matchFilter = {
			username: "userPass2",
			deadline: {}
		};
		if(filter && filter === "today"){
            dateObj.setDate(prevDate.getDate() -1)
		    matchFilter.deadline = {$gt: dateObj, $lte: new Date()}
		}else if(filter && filter === "24hr"){
            dateObj.setDate(prevDate.getDate() -1)
            matchFilter.deadline = {$gte: dateObj, $lt: new Date()}
		}else if(filter && filter ==="week"){
            dateObj.setDate(prevDate.getDate() -7)
		    matchFilter.deadline = {$gt: dateObj, $lte: new Date()}
		}else if(filter && filter === "month"){
            dateObj.setMonth(today.getMonth() - 1);
		    matchFilter.deadline = {$gt: dateObj, $lte: new Date()}
		}else if(filter && filter === "year"){
            dateObj.setFullYear(prevDate.getFullYear() -1)
		    matchFilter.deadline = {$gt: dateObj, $lte: new Date()}
		}else if(filter && filter === "custom"){
            const {start, end} = req.query
            matchFilter.deadline = {$gte: start, $lte: end}
        }else{
            const start = new Date("1990-09-09")
            const end = new Date()
            matchFilter.deadline = {$gte: start, $lte: end}
		}
        //
        console.log(matchFilter)

        //Aggregate Pipeline
        const pipeline = [
            {
                $match: matchFilter
            },
            {
                $group: {
                    _id: "weighted average",
                    numerator: { $sum: { $multiply: ["$weight", "$score"] } },
                    denominator: { $sum: "$weight" },
                },
            },
            {
                $project: {
                    average: { $divide: ["$numerator", "$denominator"] },
                },
            },
        ];
        console.log(pipeline)
		const test = await Task.aggregate(pipeline);
		return res.status(200).json({
			message: "Success",
			result: test,
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

module.exports = { getStats };
