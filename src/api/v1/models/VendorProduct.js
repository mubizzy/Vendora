const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VendorProduct extends Model {
    static associate(models) {
      VendorProduct.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
      VendorProduct.hasMany(models.VendorVariant, {
        foreignKey: 'vendorProductId',
        as: 'vendorVariants',
      });
      VendorProduct.belongsTo(models.User, {
        as: 'creator',
        foreignKey: 'createdBy',
      });
      VendorProduct.belongsTo(models.User, {
        as: 'updater',
        foreignKey: 'updatedBy',
      });
    }
  }

  VendorProduct.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      discountPercentage: DataTypes.FLOAT,
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
      modelName: 'VendorProduct',
      timestamps: true,
    },
  );

  return VendorProduct;
};
