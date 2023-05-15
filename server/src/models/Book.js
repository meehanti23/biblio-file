const Model = require('./Model.js')

class Book extends Model {
    static get tableName() {
        return 'books'
    }

    static get relationMappings() {
        const User = require('./User.js')

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'books.userId',
                    to: 'users.id'
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title', 'author'],
            properties: {
                title: { type: 'string' },
                author: { type: 'string' },
            }
        }
    }
}

module.exports = Book
