const queries = require("../database/dbqueries");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    queries.createUser(username, email, password);
    res.send("created!"); //* change this with send token
  } catch (error) {
    console.log("error here!");
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  try {
    const user = await queries.login(email);
    if (!user) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }

    const isMatch = await queries.matchPassword(password, user.password_hash);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials (password)", 401));
    }
    //! Change res.json to respond with jsonwebtoken
    res.json(user);
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
