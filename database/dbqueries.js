const knex = require("./database");
const bcrypt = require("bcrypt");

module.exports = {
  async createUser(username, email, password) {
    try {
      const password_hash = await bcrypt.hash(password, 10);
      return knex("users").returning(["username", "email"]).insert({
        username: username,
        email: email,
        password_hash: password_hash,
      });
    } catch (error) {
      console.log("That did not go well.");
      console.error(error);
      process.exit(1);
    }
  },

  async findUser(email) {
    const getUser = await knex("users").where("email", email);
    const user = getUser[0];
    return user;
  },

  async findUserByUsername(username) {
    const getUser = await knex("users").where("username", username);
    const user = getUser[0];
    return user;
  },

  async matchPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  },
};
