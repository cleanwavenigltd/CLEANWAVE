/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
//  */
exports.up = function (knex) {};

// // /**
// //  * @param { import("knex").Knex } knex
// //  * @returns { Promise<void> }
// //  */
exports.down = function (knex) {};

// exports.up = function (knex) {
//   return knex.schema.createTable("waste", (table) => {
//     table.increments("id").primary();
//     table.integer("aggregatorId").unsigned().notNullable();
//     table.string("name").notNullable();
//     table.string("email").notNullable().unique();
//     table.string("phone").notNullable().unique();
//     table.string("password").notNullable();
//     table.string("location").notNullable();
//     table.integer("capacity").defaultTo("0");
//     table.string("gender").notNullable();
//     table.string("role").defaultTo("waste");
//     table.timestamps(true, true);
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists("waste");
// };
