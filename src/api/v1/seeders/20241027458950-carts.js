/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Carts', [
      {
        vendorProductId: 1,
        vendorVariantId: 1,
        quantity: 3,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        vendorProductId: 2,
        vendorVariantId: 5,
        quantity: 2,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        vendorProductId: 6,
        vendorVariantId: 16,
        quantity: 1,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        vendorProductId: 1,
        vendorVariantId: 1,
        quantity: 3,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        vendorProductId: 2,
        vendorVariantId: 5,
        quantity: 2,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        vendorProductId: 3,
        vendorVariantId: 8,
        quantity: 1,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Carts', null, {});
  },
};
