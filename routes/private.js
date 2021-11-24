const express = require("express");
const router = express.Router();
const { getAllEntriesByDate } = require("../controllers/private");
const auth = require("../middleware/auth");

router.route("/getEntries/:date").get(auth.protect, getAllEntriesByDate);

module.exports = router;
