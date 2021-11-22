exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table
      .string("username")
      .unique()
      .notNullable()
      .unique()
      .onDelete("cascade");
    table.string("email").unique().notNullable().unique().onDelete("cascade");
    table.string("password_hash").notNullable().onDelete("cascade");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
