const express = require("express");
const router = express();
const validateDto = require("../middleware/validate-dto");
const devDto = require("../dto/dev");

const {
  register,
  login,
  // forgotpassword,
  // resetpassword,
} = require("../controllers/auth");

router.route("/register").post(validateDto(devDto), register);

router.route("/login").post(login);

// router.route("/forgotpassword").post(forgotpassword);

// router.route("/resetpassword/:resetToken").put(resetpassword);

module.exports = router;
