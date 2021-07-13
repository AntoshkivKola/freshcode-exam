'use strict';

const { OFFER_STATUSES, ROLES } = require('../../constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      contestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Contests',
          key: 'id'
        }
      },
      text: {
        type: Sequelize.STRING
      },
      fileName: {
        type: Sequelize.STRING
      },
      originalFileName: {
        type: Sequelize.STRING
      },
      reasonOfBan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM(...Object.values(OFFER_STATUSES)),
        defaultValue: OFFER_STATUSES.PENDING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Offers');
  }
};
