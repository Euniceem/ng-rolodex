
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'eunicemin',
          name: 'eunice',
          email: 'euniceem1007@gmail.com',
          address: '123 Ward St. Honolulu, HI, 96814'
        }

      ]);
    });
};
