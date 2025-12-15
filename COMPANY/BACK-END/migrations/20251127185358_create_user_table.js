/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.up = function (knex) {};

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.down = function (knex) {};

exports.up = function (knex) {
  return knex.schema.createTable("Users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("phone").notNullable().unique();
    table.string("password").notNullable();
    table.string("gender").notNullable();
    table.string("role").defaultTo("user");
    table.string("location").nullable();
    table.string("age").nullable();
    table.string("capacity").nullable();
    table
      .integer("created_by")
      .unsigned()
      .references("id")
      .inTable("Users")
      .onDelete("SET NULL");
    table.boolean("is_verified").defaultTo(false);
    table.string("verification_token").nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Users");
};
