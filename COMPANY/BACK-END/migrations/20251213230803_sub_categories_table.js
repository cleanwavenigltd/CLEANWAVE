/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("Sub_Categories", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable().unique();
        table.integer("prize_per_kg").notNullable();
        table.integer("category_id").unsigned().references("id").inTable("Categories").onDelete("CASCADE");
        table.timestamps(true, true);
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Sub_Categories");
  
};
