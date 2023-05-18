const Model = require("./Model.js")

class Review extends Model {
    static get tableName() {
        return "reviews"
    }
    
    static get relationMappings() {
        const { User, GoogleBook } = require("./index.js")
    
        return {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
            from: "reviews.userId",
            to: "users.id",
            },
        },
        googleBook: {
            relation: Model.BelongsToOneRelation,
            modelClass: GoogleBook,
            join: {
            from: "reviews.bookId",
            to: "google_books.id",
            },
        },
        }
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["reviewBody"],
            properties: {
                reviewBody: { type: "string" }
        }
        }
    }
}


module.exports = Review