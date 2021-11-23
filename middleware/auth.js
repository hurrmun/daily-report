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
  decodeToken(token) {
    return jwt.verify(token, privateKey);
  },
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
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await knex("users").where("id", decoded.user_id);

      if (!user) {
        return next(new ErrorResponse("No user found with this ID", 404));
      }

      req.user = user;

      next();
    } catch (error) {
      return next(
        new ErrorResponse("Not authorised to access this route", 401)
      );
    }
  },
};