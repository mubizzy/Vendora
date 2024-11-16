/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      uniqueId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      discountPercentage: Sequelize.FLOAT,
      slug: Sequelize.STRING,
      title: Sequelize.STRING,
      subTitle: Sequelize.STRING,
      description: Sequelize.TEXT,
      status: {
        type: Sequelize.ENUM('published', 'unpublished'),
        defaultValue: 'unpublished',
      },
      thumbnail: Sequelize.STRING,
      originCountry: Sequelize.STRING,
      material: Sequelize.STRING,
      salesCount: { type: Sequelize.INTEGER, defaultValue: 0 },
      bestDeal: { type: Sequelize.BOOLEAN, defaultValue: false },
      type: { type: Sequelize.STRING, allowNull: false },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      subCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SubCategories',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      images: Sequelize.ARRAY(Sequelize.STRING),
      sizes: Sequelize.ARRAY(Sequelize.STRING),
      colors: Sequelize.ARRAY(Sequelize.STRING),
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Products');
  },
};
