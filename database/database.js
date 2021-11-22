const environment = process.env.NODE_ENV || "development";
const knexfile = require("./knexfile");
const environmentConfig = knexfile[environment];
const knex = require("knex");

const database = knex(environmentConfig);
module.exports = database;
