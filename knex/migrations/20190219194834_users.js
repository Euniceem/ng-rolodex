
exports.up = function (knex, Promise) {
  knex.schema.createTable('users', function (table) {
    table.increments().primary().unique().notNullable();
    table.string('username', 255).unique().notNullable();
    table.timestamps(true, true).notNullable();
    table.string('name', 500).nullable();
    table.string('email', 500).nullable();
    table.string('address', 500).nullable();
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
};
