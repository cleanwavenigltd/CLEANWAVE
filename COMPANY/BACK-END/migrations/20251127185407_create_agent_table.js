/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {};

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
exports.down = function (knex) {};

// exports.up = function (knex) {
//   return knex.schema.createTable("Agents", (table) => {
//     table.increments("id").primary();
//     table.integer("aggregatorId").unsigned().notNullable();
//     table.string("name").notNullable();
//     table.string("email").notNullable().unique();
//     table.string("phone").notNullable().unique();
//     table.string("password").notNullable();
//     table.integer("age").notNullable();
//     table.string("gender").defaultTo("male");
//     table.string("location").notNullable();
//     table.timestamps(true, true);
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists("Agents");
// };
