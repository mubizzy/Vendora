const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        uniqueId: uuidv4(),
        role: 1,
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin@admin.com',
        password:
          'd423fcf1f63b380e3eb4fbc6efc876833ab19f2ef583169b3c05d0c2bdfbdc62024477ea823a8fde3810ccfefae6c757fadac25c0e0989f724d6904d94603bd0.63b80bde5f28e454',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
      },
      {
        uniqueId: uuidv4(),
        role: 2,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        password:
          'd423fcf1f63b380e3eb4fbc6efc876833ab19f2ef583169b3c05d0c2bdfbdc62024477ea823a8fde3810ccfefae6c757fadac25c0e0989f724d6904d94603bd0.63b80bde5f28e454',
        verified: true,
        companyName: 'Test Vendor Company',
        companyEmail: 'support@v1.com',
        officeAddress: '3692 Pine Street, Coronation, Alberta',
        companyPhoto: 'http://localhost:8003/uploads/vendors/vendor-1.png',
        officePhone: '14035788097',
        tssaAuthorizationNumber: 'HJHS78545621',
        tssaProLeUrl: 'https://www.google.com',
        tssaAuthorizationStartDate: '08-02-2022',
        tssaAuthorizationExpiryDate: '08-02-2028',
        hraiAuthorizationNumber: 'OLKSH78954123',
        hraiProLeUrl: 'https://www.google.com',
        hraiAuthorizationStartDate: '06-03-2021',
        hraiAuthorizationExpiryDate: '06-03-2029',
        vendorVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
      },
      {
        uniqueId: uuidv4(),
        role: 2,
        firstName: 'Mike',
        lastName: 'Hussy',
        email: 'mike@test.com',
        password:
          'd423fcf1f63b380e3eb4fbc6efc876833ab19f2ef583169b3c05d0c2bdfbdc62024477ea823a8fde3810ccfefae6c757fadac25c0e0989f724d6904d94603bd0.63b80bde5f28e454',
        verified: true,
        companyName: 'Test Vendor Company',
        companyEmail: 'support@v1.com',
        officeAddress: '3692 Pine Street, Coronation, Alberta',
        companyPhoto: 'http://localhost:8003/uploads/vendors/vendor-1.png',
        officePhone: '14035788097',
        tssaAuthorizationNumber: 'HJHS78545621',
        tssaProLeUrl: 'https://www.google.com',
        tssaAuthorizationStartDate: '08-02-2022',
        tssaAuthorizationExpiryDate: '08-02-2028',
        hraiAuthorizationNumber: 'OLKSH78954123',
        hraiProLeUrl: 'https://www.google.com',
        hraiAuthorizationStartDate: '06-03-2021',
        hraiAuthorizationExpiryDate: '06-03-2029',
        vendorVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
      },
      {
        uniqueId: uuidv4(),
        role: 3,
        firstName: 'Jahid',
        lastName: 'Hiron',
        email: 'hironse.96@gmail.com',
        password:
          'd423fcf1f63b380e3eb4fbc6efc876833ab19f2ef583169b3c05d0c2bdfbdc62024477ea823a8fde3810ccfefae6c757fadac25c0e0989f724d6904d94603bd0.63b80bde5f28e454',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
      },
      {
        uniqueId: uuidv4(),
        role: 3,
        firstName: 'Ahad',
        lastName: 'Hossain',
        email: 'ahadxx99@gmail.com',
        password:
          'd423fcf1f63b380e3eb4fbc6efc876833ab19f2ef583169b3c05d0c2bdfbdc62024477ea823a8fde3810ccfefae6c757fadac25c0e0989f724d6904d94603bd0.63b80bde5f28e454',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
