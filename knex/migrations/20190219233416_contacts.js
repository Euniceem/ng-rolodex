
exports.up = function (knex, Promise) {
  knex.schema.createTable('contacts', function (table) {
    table.increments().unique().notNullable();
    table.string('name', 255).notNullable();
    table.timestamps(true, true).notNullable();
    table.string('address', 500).nullable();
    table.string('mobile', 15).nullable();
    table.string('work', 15).nullable();
    table.string('home', 15).nullable();
    table.string('email', 500).nullable();
    table.string('twitter', 500).nullable();
    table.string('instagram', 500).nullable();
    table.string('github', 500).nullable();
    table.integer('created_by').references('id').inTable('users')
  })
};

exports.down = function (knex, Promise) {
  knex.schema.dropTable('contacts')
};
