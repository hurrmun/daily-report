const express = require("express");
const router = express.Router();
const {
  getReportsByDate,
  getReportByUser,
  getOptions,
  submitReport,
  editReport,
  deleteReport,
} = require("../controllers/private");
const auth = require("../middleware/auth");

router.route("/getEntries/:date").get(auth.protect, getReportsByDate);
router.route("/getEntries/:date/:username").get(auth.protect, getReportByUser);
router.route("/getOptions").get(auth.protect, getOptions);
router.route("/submitReport").post(auth.protect, submitReport);
router.route("/editReport/:date").put(auth.protect, editReport);
router.route("/deleteReport/:date").delete(auth.protect, deleteReport);

module.exports = router;
