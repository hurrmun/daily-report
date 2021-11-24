exports.up = function (knex) {
  return knex.schema.createTable("supplier", (table) => {
    table.increments("supplier_id");
    table.string("name").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("supplier");
};
