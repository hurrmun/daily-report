const jwt = require("jsonwebtoken");
const knex = require("../database/database");
const privateKey = process.env.JWT_SECRET;
const ErrorResponse = require("../utils/errorResponse");

module.exports = {
  getToken(userID, username) {
    const payload = { user_id: userID, username: username };
    return jwt.sign(payload, privateKey, {
      algorithm: "HS256",
      noTimestamp: true,
    });
  },
  // decodeToken(token) {
  //   return jwt.verify(token, privateKey);
  // },
  async protect(req, res, next) {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }

    try {
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      const user = await knex("users").where("username", decoded.username);

      if (!user) {
        return next(new ErrorResponse("No user found with this ID", 404));
      }

      req.user = user[0];

      next();
    } catch (error) {
      return next(
        new ErrorResponse("Not authorised to access this route", 401)
      );
    }
  },
};
