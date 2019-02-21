const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
  get tableName() { return 'users'; }
  get timeStamps() { return true; }

  created() {
    return this.hasMany('Contact', 'created_by');

  }
}


module.exports = bookshelf.model('User', User);