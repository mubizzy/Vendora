const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ShippingMethod extends Model {
    static associate(models) {
      ShippingMethod.belongsTo(models.User, {
        as: 'creator',
        foreignKey: 'createdBy',
      });
      ShippingMethod.belongsTo(models.User, {
        as: 'updater',
        foreignKey: 'updatedBy',
      });
    }
  }

  ShippingMethod.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      estimatedDelivery: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
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
      modelName: 'ShippingMethod',
      timestamps: true,
    },
  );

  return ShippingMethod;
};
