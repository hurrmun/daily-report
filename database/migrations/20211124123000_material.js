exports.up = function (knex) {
  return knex.schema.createTable("material", (table) => {
    table.increments("material_id");
    table.string("name").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("material");
};
