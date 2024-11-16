/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Subscriptions', [
      {
        email: 'user1@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user2@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user3@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user4@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user5@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user6@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user7@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user8@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user9@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user10@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user11@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user12@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user13@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user14@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user15@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Subscriptions', null, {});
  },
};
