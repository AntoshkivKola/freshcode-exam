
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Select extends Model {
    static associate(models) {}
  }
  Select.init(
    {
      type: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      describe: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Select',
      timestamps: false,
    },
  );
  return Select;
};
