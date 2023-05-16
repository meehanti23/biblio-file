/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("google_books", (table) => {
        table.bigInteger('userId').unsigned().index().notNullable().references('users.id')
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("google_books", (table) => {
        table.dropColumn('userId')
    })
}
