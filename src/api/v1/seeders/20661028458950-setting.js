const currentDate = new Date();
const expiredAt = new Date(currentDate);
expiredAt.setDate(currentDate.getDate() + 7);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Settings', [
      {
        upFrontPay: 5,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Settings', null, {});
  },
};
