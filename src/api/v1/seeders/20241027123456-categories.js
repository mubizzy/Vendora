/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Air Conditioners',
        slug: 'air-conditioners',
        description:
          'Air conditioners cool indoor spaces by drawing in warm air, cooling it with a refrigerant, and recirculating it. They also help dehumidify and can filter out dust, providing a comfortable, controlled environment in homes and businesses. Common types include central, window, portable, and split systems.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Furnaces',
        slug: 'furnaces',
        description:
          'Furnaces are heating systems that generate warm air by burning fuel (like gas, oil, or electricity) to heat a home or building. They distribute this heat through ducts, providing efficient warmth during colder months.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heat Pumps',
        slug: 'heat-pumps',
        description:
          'A heat pump is an energy-efficient system that transfers heat between indoor and outdoor environments to provide heating or cooling. In cold weather, it extracts heat from outside air, ground, or water to warm indoor spaces, and in warm weather, it reverses to cool by moving indoor heat outside.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Water Heaters',
        slug: 'water-heaters',
        description:
          'Water heaters are appliances that heat water for residential, commercial, or industrial use. They come in various types, including tankless, storage tank, and solar, and are typically powered by electricity, gas, or solar energy. Water heaters provide hot water for bathing, cleaning, cooking, and heating.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
