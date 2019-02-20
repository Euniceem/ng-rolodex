const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
  get tableName() { return 'users'; }
  get timeStamps() { return true; }

  created() {
    return this.hasMany('contacts');
  }
}


module.exports = bookshelf.Model('User', User);