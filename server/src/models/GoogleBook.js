const Model = require('./Model.js');

class GoogleBook extends Model {
  static get tableName() {
    return 'google_books';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['volumeID'],
      properties: {
        volumeID: { type: 'string' },
      },
    };
  }
}

module.exports = GoogleBook;
