const knex = require("./database");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

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

  async findUserByEmail(email) {
    const getUser = await knex("users").where("email", email);
    const user = getUser[0];
    return user;
  },

  async findUserByUsername(username) {
    const getUser = await knex("users")
      .where("username", username)
      .select("username", "user_id", "email");
    const user = getUser[0];
    return user;
  },

  async matchPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  },

  async getEntriesByDate(date) {
    const entries = await knex("entry")
      .where("date", date)
      .join("users", "entry.user_id", "=", "users.user_id")
      .select("username");
    // console.log("entries", entries);
    return entries;
  },

  async getEntriesByUser(date, username) {
    const entries = await knex("entry")
      .join("users", "entry.user_id", "=", "users.user_id")
      .join("material", "entry.material_id", "=", "material.material_id")
      .join("supplier", "entry.supplier_id", "=", "supplier.supplier_id")
      .where({ date: date, username: username })
      .select(
        "entry_id",
        "material",
        "supplier",
        "ordered_load",
        "received_load",
        "quantity(MT)",
        "remarks"
      );
    // console.log("entries", entries);
    return entries;
  },

  async getMaterials() {
    const materials = await knex("material");
    return materials;
  },

  async getSuppliers() {
    const suppliers = await knex("supplier");
    return suppliers;
  },

  async createEntry(entry, user) {
    try {
      return knex("entry")
        .returning(["entry_id", "user_id"])
        .insert({
          date: new Date(entry.date),
          user_id: user.user_id,
          material_id: entry.material.material_id,
          supplier_id: entry.supplier.supplier_id,
          ordered_load: entry.ordered_load,
          received_load: entry.received_load,
          "quantity(MT)": entry.quantity,
          remarks: entry.remarks,
        });
    } catch (error) {
      console.log("That did not go well.");
      console.error(error);
      process.exit(1);
    }
  },
  //   async getSignedToken(email) {
  //     return jwt.sign({ email: email }, process.env.JWT_SECRET, {
  //       expiresIn: process.env.JWT_EXPIRE,
  //     });
  //   },
};
