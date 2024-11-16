/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductVariants', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      sku: Sequelize.STRING,
      barcode: Sequelize.STRING,
      ean: Sequelize.STRING,
      upc: Sequelize.STRING,
      hsCode: Sequelize.STRING,
      midCode: Sequelize.STRING,
      weight: Sequelize.STRING,
      length: Sequelize.STRING,
      height: Sequelize.STRING,
      width: Sequelize.STRING,
      size: Sequelize.STRING,
      color: Sequelize.STRING,
      buyingPrice: Sequelize.FLOAT,
      sellingPrice: Sequelize.FLOAT,
      quantity: { type: Sequelize.INTEGER, defaultValue: 0 },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ProductVariants');
  },
};
