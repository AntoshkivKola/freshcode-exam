
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Buyer',
          lastName: 'Buyerovich',
          displayName: 'buyer',
          passwordHash: await bcrypt.hashSync('Test1234', SALT_ROUNDS),
          email: 'buyer@mail.com',
          role: 'customer',
        },
        {
          firstName: 'Creator',
          lastName: 'Creatorvich',
          displayName: 'creator',
          passwordHash: await bcrypt.hashSync('Test1234', SALT_ROUNDS),
          email: 'creator@mail.com',
          role: 'creator',
        },
        {
          firstName: 'Moderator',
          lastName: 'Moderatorovich',
          displayName: 'moderator',
          passwordHash: await bcrypt.hashSync('Test1234', SALT_ROUNDS),
          email: 'moderator@mail.com',
          role: 'moderator',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
