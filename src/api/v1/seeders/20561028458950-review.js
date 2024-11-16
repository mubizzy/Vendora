const currentDate = new Date();
const expiredAt = new Date(currentDate);
expiredAt.setDate(currentDate.getDate() + 7);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Reviews', [
      {
        review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard`,
        rating: 5,
        productId: 1,
        customerId: 4,
        updatedBy: 1,
        fileUrl: 'http://localhost:8003/uploads/products/product-1.jpg',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard`,
        rating: 4.5,
        productId: 2,
        customerId: 4,
        updatedBy: 1,
        fileUrl: 'http://localhost:8003/uploads/products/product-1.jpg',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard`,
        rating: 4,
        productId: 3,
        customerId: 4,
        updatedBy: 1,
        fileUrl: 'http://localhost:8003/uploads/products/product-1.jpg',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard`,
        rating: 5,
        productId: 1,
        customerId: 5,
        updatedBy: 1,
        fileUrl: 'http://localhost:8003/uploads/products/product-1.jpg',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard`,
        rating: 4.5,
        productId: 2,
        customerId: 5,
        updatedBy: 1,
        fileUrl: 'http://localhost:8003/uploads/products/product-1.jpg',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard`,
        rating: 4,
        productId: 3,
        customerId: 5,
        updatedBy: 1,
        fileUrl: 'http://localhost:8003/uploads/products/product-1.jpg',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Reviews', null, {});
  },
};
