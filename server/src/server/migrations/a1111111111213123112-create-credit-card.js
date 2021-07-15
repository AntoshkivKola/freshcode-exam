
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('CreditCards', {
      cardNumber: {
        type: Sequelize.STRING(16),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiry: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      cvc: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
    })
    .then(() => queryInterface.addConstraint('CreditCards', {
      type: 'check',
      fields: ['balance'],
      where: {
        balance: {
          [Sequelize.Op.gte]: 0,
        },
      },
    })),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('CreditCards'),
};
