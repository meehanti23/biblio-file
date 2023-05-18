const Model = require('./Model.js');

class GoogleBook extends Model {
  static get tableName() {
    return 'google_books';
  }

  static get relationMappings() {
    const { User, Review } = require('./index.js');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'google_books.userId',
          to: 'users.id',
        },
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: 'google_books.id',
          to: 'reviews.bookId'
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string' },
      },
    };
  }
}

module.exports = GoogleBook;
