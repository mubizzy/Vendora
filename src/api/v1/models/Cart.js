const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      Cart.belongsTo(models.VendorProduct, {
        foreignKey: 'vendorProductId',
        as: 'vendorProduct',
      });
      Cart.belongsTo(models.VendorVariant, {
        foreignKey: 'vendorVariantId',
        as: 'vendorVariant',
      });
    }
  }

  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      vendorProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'VendorProducts',
          key: 'id',
        },
      },
      vendorVariantId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'VendorVariants',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
    },
    {
      sequelize,
      modelName: 'Cart',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  );

  return Cart;
};
