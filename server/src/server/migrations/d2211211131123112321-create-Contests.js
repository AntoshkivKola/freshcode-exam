
const { CONTEST_TYPES, CONTESTS_STATUSES } = require('../../constants');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('Contests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      contestType: {
        allowNull: false,
        type: Sequelize.ENUM(...Object.values(CONTEST_TYPES)),
      },
      fileName: {
        type: Sequelize.STRING,
      },
      originalFileName: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      typeOfName: {
        type: Sequelize.STRING,
      },
      industry: {
        type: Sequelize.STRING,
      },
      focusOfWork: {
        type: Sequelize.TEXT,
      },
      targetCustomer: {
        type: Sequelize.TEXT,
      },
      styleName: {
        type: Sequelize.STRING,
      },
      nameVenture: {
        type: Sequelize.STRING,
      },
      typeOfTagline: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(...Object.values(CONTESTS_STATUSES)),
        allowNull: false,
      },
      brandStyle: {
        type: Sequelize.STRING,
      },
      prize: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      priority: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    })
    .then(() => queryInterface.addConstraint('Contests', {
      type: 'check',
      fields: ['prize'],
      where: {
        prize: {
          [Sequelize.Op.gte]: 0,
        },
      },
    })),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Contests'),
};
