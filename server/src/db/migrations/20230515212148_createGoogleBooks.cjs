/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable('google_books', (table) => {
        table.bigIncrements('id')
        table.string('title').notNullable()
        table.string('authors')
        table.integer('pageCount')
        table.text('description')
        table.string('categories')
        table.text('smallImage')
        table.text('largeImage')
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists('google_books')
}
