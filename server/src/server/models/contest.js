
const { Model } = require('sequelize');
const { CONTEST_TYPES, CONTESTS_STATUSES } = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {
    static associate(models) {
      Contest.belongsTo(models.User, {
        foreignKey: 'userId',
        sourceKey: 'id',
      });
      Contest.hasMany(models.Offer, {
        foreignKey: 'contestId',
        targetKey: 'id',
      });
    }
  }
  Contest.init(
    {
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      contestType: {
        type: DataTypes.ENUM(...Object.values(CONTEST_TYPES)),
        allowNull: false,
      },
      fileName: {
        type: DataTypes.STRING,
      },
      originalFileName: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      typeOfName: {
        type: DataTypes.STRING,
      },
      industry: {
        type: DataTypes.STRING,
      },
      focusOfWork: {
        type: DataTypes.TEXT,
      },
      targetCustomer: {
        type: DataTypes.TEXT,
      },
      styleName: {
        type: DataTypes.STRING,
      },
      nameVenture: {
        type: DataTypes.STRING,
      },
      typeOfTagline: {
        type: DataTypes.STRING,
      },
      brandStyle: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(CONTESTS_STATUSES)),
        allowNull: false,
      },
      prize: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        validate: {
          min: 0,
        },
      },
      priority: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: 'Contest',
    },
  );
  return Contest;
};
