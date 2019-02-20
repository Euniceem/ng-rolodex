
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts').del()
    .then(function () {
      // Inserts seed entries
      return knex('contacts').insert([
        {
          id: 1,
          name: 'Barry Allen',
          address: '123 Starlabs Central City, NY, 96812',
          mobile: '834-555-4444',
          work: '911',
          home: '823-645-9832',
          email: 'Barry_Allen@gmail.com',
          twitter: 'the_flash',
          instagram: 'the_flash',
          github: 'lighting_speed'
        },
        {
          id: 2,
          name: 'Oliver Queen',
          address: '123 Arrow Star City, NY, 96672',
          mobile: '834-453-6534',
          work: '911',
          home: '823-932-0045',
          email: 'Oliver_Queen@gmail.com',
          twitter: 'green_arrow',
          instagram: 'green_arrow',
          github: 'oli_queen'
        },
        {
          id: 3,
          name: 'Kara Danvers',
          address: '123 Woodlane Apt 5C National City, NY, 96210',
          mobile: '818-945-0034',
          work: '818-220-9245',
          home: '818-398-9255',
          email: 'KDanvers@gmail.com',
          twitter: 'Kara_Danvers',
          instagram: 'KDanvers',
          github: 'KaraDanvers'
        },

      ]);
    });
};
