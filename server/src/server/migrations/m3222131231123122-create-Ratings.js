
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('Ratings', {
      offerId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Offers',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      mark: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    })
    .then(() => queryInterface.addConstraint('Ratings', {
      type: 'check',
      fields: ['mark'],
      where: {
        mark: {
          [Sequelize.Op.and]: [{ [Sequelize.Op.gte]: 0 }, { [Sequelize.Op.lte]: 5 }],
        },
      },
    })),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Ratings'),
};
