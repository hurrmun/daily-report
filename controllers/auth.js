const queries = require("../database/dbqueries");
const ErrorResponse = require("../utils/errorResponse");
const auth = require("../middleware/auth");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const userByEmail = await queries.findUserByEmail(email);
    const userByUsername = await queries.findUserByUsername(username);
    if (username === userByUsername?.username) {
      return next(new ErrorResponse("Username is already taken", 400));
    }
    if (email === userByEmail?.email) {
      return next(new ErrorResponse("Email is already taken", 400));
    }
    await queries.createUser(username, email, password);
    const registeredUser = await queries.findUserByEmail(email);
    //! change this with send token
    const token = auth.getToken(
      registeredUser.user_id,
      registeredUser.username
    );
    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  try {
    const user = await queries.findUserByEmail(email);
    if (!user) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }
    const isMatch = await queries.matchPassword(password, user.password_hash);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials (password)", 401));
    }
    //! Change res.json to respond with jsonwebtoken
    const token = auth.getToken(user.user_id, user.username);
    res.status(200).json({
      success: true,
      token: token,
    });
    // sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// exports.forgotpassword = async (req, res, next) => {
//   res.send("forgot password route");
// };

// exports.resetpassword = async (req, res, next) => {
//   res.send("resetpassword route");
// };

// const sendToken = (user, statusCode, res) => {
//   const token = queries.getSignedToken(user.email);
//   res.status(statusCode).json({ success: true, token });
// };
