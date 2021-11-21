//* Connect to local postgres DB
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: "",
    database: process.env.DB_NAME,
  },
});

module.exports = knex;
