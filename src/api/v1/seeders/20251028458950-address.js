/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Addresses', [
      {
        phone: '01748028581',
        address: 'Z/28, Zakir Hossain Road, Lalmatia',
        city: 'Dhaka',
        state: 'Dhaka',
        zipCode: '1207',
        company: 'Tech Symbio',
        apartment: '4th floor, north',
        country: 'Bangladesh',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phone: '01748028582',
        address: 'Z/27, Zakir Hossain Road, Lalmatia',
        city: 'Dhaka',
        state: 'Dhaka',
        zipCode: '1208',
        company: 'Brain Station 23',
        apartment: '5th floor, north',
        country: 'Bangladesh',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phone: '01948028581',
        address: 'Z/28, Block 1, Road 2, Dhanmondi',
        city: 'Dhaka',
        state: 'Dhaka',
        zipCode: '1205',
        company: 'Data Soft',
        apartment: '4th floor, south',
        country: 'Bangladesh',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phone: '01948028582',
        address: 'Z/28, Block 2, Road 2 Dhanmondi',
        city: 'Dhaka',
        state: 'Dhaka',
        zipCode: '1205',
        company: 'Cefalo ',
        apartment: '5th floor, south',
        country: 'Bangladesh',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Addresses', null, {});
  },
};
