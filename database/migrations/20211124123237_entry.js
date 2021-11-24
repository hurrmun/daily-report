exports.up = function (knex) {
  return knex.schema.createTable("entry", (table) => {
    table.increments("entry_id");
    table.date("date").notNullable();
    table
      .integer("user_id")
      .notNullable()
      .references("user_id")
      .inTable("users");
    table
      .integer("material_id")
      .notNullable()
      .references("material_id")
      .inTable("material");
    table
      .integer("supplier_id")
      .notNullable()
      .references("supplier_id")
      .inTable("supplier");
    table.integer("ordered_load");
    table.integer("received_load");
    table.float("quantity(MT)").notNullable();
    table.string("remarks");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("entry");
};
