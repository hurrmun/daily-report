const express = require("express");
const router = express.Router();
const { getReportsByDate, getReportByUser } = require("../controllers/private");
const auth = require("../middleware/auth");

router.route("/getEntries/:date").get(auth.protect, getReportsByDate);
router.route("/getEntries/:date/:username").get(auth.protect, getReportByUser);

module.exports = router;
