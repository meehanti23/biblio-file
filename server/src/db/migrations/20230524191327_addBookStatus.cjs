/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("google_books", (table) => {
        table.string('bookStatus').defaultTo('')
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("google_books", (table) => {
        table.dropColumn('bookStatus')
    })
}
