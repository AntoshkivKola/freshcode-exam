
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Selects', {
    type: {
      primaryKey: true,
      type: Sequelize.STRING,
    },
    describe: {
      primaryKey: true,
      type: Sequelize.STRING,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Selects'),
};
