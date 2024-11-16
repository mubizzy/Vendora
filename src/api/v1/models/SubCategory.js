const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    static associate(models) {
      SubCategory.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
      });
      SubCategory.hasMany(models.Product, {
        foreignKey: 'subCategoryId',
        as: 'products',
      });
    }
  }

  SubCategory.init(
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
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Category',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'SubCategory',
      timestamps: true,
    },
  );

  return SubCategory;
};
