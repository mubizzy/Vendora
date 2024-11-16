const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
      });
      Product.belongsTo(models.SubCategory, {
        foreignKey: 'subCategoryId',
        as: 'subcategory',
      });
      Product.hasMany(models.ProductVariant, {
        foreignKey: 'productId',
        as: 'variants',
      });
      Product.belongsTo(models.User, {
        as: 'creator',
        foreignKey: 'createdBy',
      });
      Product.belongsTo(models.User, {
        as: 'updater',
        foreignKey: 'updatedBy',
      });
      Product.hasMany(models.VendorProduct, {
        foreignKey: 'productId',
        as: 'vendorProducts',
      });
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      uniqueId: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      slug: DataTypes.STRING,
      title: DataTypes.STRING,
      subTitle: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.ENUM,
        values: ['published', 'unpublished'],
        defaultValue: 'unpublished',
      },
      thumbnail: DataTypes.STRING,
      originCountry: DataTypes.STRING,
      material: DataTypes.STRING,
      discountPercentage: DataTypes.FLOAT,
      salesCount: { type: DataTypes.INTEGER, defaultValue: 0 },
      bestDeal: { type: DataTypes.BOOLEAN, defaultValue: false },
      type: { type: DataTypes.STRING, allowNull: false },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Category',
          key: 'id',
        },
      },
      subCategoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'SubCategory',
          key: 'id',
        },
      },
      images: DataTypes.ARRAY(DataTypes.STRING),
      sizes: DataTypes.ARRAY(DataTypes.STRING),
      colors: DataTypes.ARRAY(DataTypes.STRING),
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
      modelName: 'Product',
      timestamps: true,
    },
  );

  return Product;
};
