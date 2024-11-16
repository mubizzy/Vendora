const { generateStringCode } = require('../utils');

const currentDate = new Date();
const expiredAt = new Date(currentDate);
expiredAt.setDate(currentDate.getDate() + 7);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Coupons', [
      {
        title: 'Festival',
        percentage: 5,
        updatedBy: 1,
        // applicableProducts: [1, 2, 3],
        couponCode: generateStringCode(8),
        createdAt: new Date(),
        updatedAt: new Date(),
        expiredAt,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Coupons', null, {});
  },
};
