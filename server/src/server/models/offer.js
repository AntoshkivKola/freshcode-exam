'use strict';
const { Model } = require('sequelize');
const { OFFER_STATUSES } = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate (models) {
      Offer.belongsTo(models.User, {
        foreignKey: 'userId',
        sourceKey: 'id'
      });
      Offer.belongsTo(models.Contest, {
        foreignKey: 'contestId',
        sourceKey: 'id'
      });
      Offer.hasOne(models.Rating, {
        foreignKey: 'offerId',
        targetKey: 'id'
      });
    }
  }
  Offer.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      contestId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING
      },
      fileName: {
        type: DataTypes.STRING
      },
      originalFileName: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.ENUM(...Object.values(OFFER_STATUSES)),
        defaultValue: OFFER_STATUSES.MODERATED,
        allowNull: false
      },
      reasonOfBan: {
        type: DataTypes.STRING
      },
    },
    {
      sequelize,
      modelName: 'Offer'
    }
  );
  return Offer;
};
