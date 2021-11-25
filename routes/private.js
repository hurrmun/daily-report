const express = require("express");
const router = express.Router();
const {
  getReportsByDate,
  getReportByUser,
  getOptions,
  submitReport,
} = require("../controllers/private");
const auth = require("../middleware/auth");

router.route("/getEntries/:date").get(auth.protect, getReportsByDate);
router.route("/getEntries/:date/:username").get(auth.protect, getReportByUser);
router.route("/getOptions").get(auth.protect, getOptions);
router.route("/submitReport").post(auth.protect, submitReport);

module.exports = router;
