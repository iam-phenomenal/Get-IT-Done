const router = require("express").Router();

const { tokenVerification } = require("../utils/tokenizer");
const { getStats } = require("../controllers/statsController");
const { getStatsValidator } = require("../utils/validators/statsValidator");

router.get("/:userid/", getStatsValidator, getStats);

module.exports = router;
