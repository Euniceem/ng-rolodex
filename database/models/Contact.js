const bookshelf = require('./bookshelf');

class Contact extends bookshelf.Model {
  get tableName() { return 'contacts'; }
  get timestamps() { return true; }

  created() {
    return this.belongsTo('User', 'created_by');
  }
}

module.exports = bookshelf.model('Contact', Contact);