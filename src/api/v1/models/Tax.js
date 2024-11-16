const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tax extends Model {
    static associate(models) {
      Tax.belongsTo(models.User, {
        as: 'creator',
        foreignKey: 'createdBy',
      });
      Tax.belongsTo(models.User, {
        as: 'updater',
        foreignKey: 'updatedBy',
      });
    }
  }

  Tax.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      percentage: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Tax',
      timestamps: true,
    },
  );

  return Tax;
};
