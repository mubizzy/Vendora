/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('VendorProducts', [
      {
        productId: 1,
        discountPercentage: 5,
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 2,
        updatedBy: 1,
      },
      {
        productId: 2,
        discountPercentage: 7,
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 2,
        updatedBy: 1,
      },
      {
        productId: 3,
        discountPercentage: 8,
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 2,
        updatedBy: 1,
      },
      {
        productId: 4,
        discountPercentage: 0,
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 2,
        updatedBy: 1,
      },
      {
        productId: 5,
        discountPercentage: 0,
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 2,
        updatedBy: 1,
      },
      {
        productId: 1,
        discountPercentage: 5,
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 3,
        updatedBy: 1,
      },
      {
        productId: 2,
        discountPercentage: 7,
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 3,
        updatedBy: 1,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('VendorProducts', null, {});
  },
};
