/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Waste_pickups", (table) => {
    table.string("user_id").notNullable();
    table.string("waste_type").notNullable();
    table.decimal("kg", 10, 2).notNullable();
    table.string("info");
    table.string("location").notNullable();
    table.string("status").defaultTo("pending");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Waste_pickups");
};
