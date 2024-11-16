const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.SubCategory, {
        foreignKey: 'categoryId',
        as: 'subcategories',
      });
      Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        as: 'products',
      });
    }
  }

  Category.init(
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
        unique: { args: true, msg: 'Name already in use' },
        validate: {
          notNull: { msg: 'Name is required' },
          notEmpty: { msg: 'Name is required' },
        },
      },
      description: DataTypes.TEXT,
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: 'Slug in use' },
        validate: {
          notNull: { msg: 'Slug is required' },
          notEmpty: { msg: 'Slug is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
      timestamps: true,
    },
  );

  return Category;
};
