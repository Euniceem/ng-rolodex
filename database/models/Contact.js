const bookshelf = require('./bookshelf');
require('./User');

class Contact extends bookshelf.Model {
  get tableName() { return 'contacts'; }
  get timestamps() { return true; }

  created() {
    return this.belongsTo('User', 'id', 'created_by');
  }
}

module.exports = bookshelf.model('Contact', Contact);