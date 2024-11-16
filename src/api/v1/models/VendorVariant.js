const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VendorVariant extends Model {
    static associate(models) {
      VendorVariant.belongsTo(models.VendorProduct, {
        foreignKey: 'vendorProductId',
        as: 'vendorProduct',
      });
    }
  }

  VendorVariant.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      sku: DataTypes.STRING,
      barcode: DataTypes.STRING,
      ean: DataTypes.STRING,
      upc: DataTypes.STRING,
      hsCode: DataTypes.STRING,
      midCode: DataTypes.STRING,
      weight: DataTypes.STRING,
      length: DataTypes.STRING,
      height: DataTypes.STRING,
      width: DataTypes.STRING,
      size: DataTypes.STRING,
      color: DataTypes.STRING,
      buyingPrice: DataTypes.FLOAT,
      sellingPrice: DataTypes.FLOAT,
      quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
      vendorProductId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'VendorProducts',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'VendorVariant',
      timestamps: true,
    },
  );

  return VendorVariant;
};
