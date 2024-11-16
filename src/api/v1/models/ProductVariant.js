const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    static associate(models) {
      ProductVariant.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
    }
  }

  ProductVariant.init(
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
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Product',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'ProductVariant',
      timestamps: true,
    },
  );

  return ProductVariant;
};
