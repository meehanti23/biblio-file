/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable('reviews', (table) => {
        table.bigIncrements('id').primary();
        table.string('reviewBody').notNullable()
        table.bigInteger('bookId').notNullable().unsigned().index().references('google_books.id')
        table.bigInteger('userId').notNullable().unsigned().index().references('users.id')
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists('reviews')
}
