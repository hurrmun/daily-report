const queries = require("../database/dbqueries");
const ErrorResponse = require("../utils/errorResponse");
const auth = require("../middleware/auth");

exports.getAllEntriesByDate = async (req, res, next) => {
  const { date } = req.params;
  // console.log(date);
  const user = await queries.findUserByUsername(req.user[0].username);
  const entries = await queries.getEntriesByDate(new Date(date));
  const allEntries = {};
  for (const entry of entries) {
    const username = entry.username;
    if (!allEntries[username]) {
      allEntries[username] = 0;
    }
    allEntries[username] += 1;
  }
  try {
    res.status(200).json({
      success: true,
      data: {
        user: user,
        date: date,
        entries: allEntries,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

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
    const user = await queries.createUser(username, email, password);
    //! change this with send token
    const token = auth.getToken(user.id, user.username);
    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
