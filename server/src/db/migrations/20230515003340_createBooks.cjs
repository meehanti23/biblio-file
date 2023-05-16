/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    await knex.schema.createTable("books", (table) => {
        table.increments("id")
        table.string("title").notNullable()
        table.string("author").notNullable()
        table.bigInteger("userId").unsigned().notNullable().references("users.id")
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
    });
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("books")
}