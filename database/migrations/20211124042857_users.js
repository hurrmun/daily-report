exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("user_id");
    table.string("username").unique().notNullable();
    table.string("email").unique().notNullable();
    table.string("password_hash").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
