/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('SubCategories', [
      // Air Conditioners Subcategories
      {
        name: 'Lennox',
        slug: 'air-conditioners-lennox',
        description:
          'Lennox air conditioners offer reliable cooling performance, ideal for maintaining a comfortable indoor environment even during the hottest days. Known for energy efficiency and durability, Lennox units are a popular choice for both residential and commercial spaces.',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carrier',
        slug: 'air-conditioners-carrier',
        description:
          'Carrier air conditioners are designed to deliver consistent and powerful cooling. With a focus on advanced filtration and quiet operation, Carrier units provide a comfortable and clean air experience, ideal for maintaining air quality indoors.',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Amana Goodman',
        slug: 'air-conditioners-amana-goodman',
        description:
          'Amana Goodman air conditioners provide reliable cooling with an emphasis on value and performance. These units are designed to withstand rigorous use and offer an affordable solution for effective indoor temperature control.',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Furnaces Subcategories
      {
        name: 'Lennox',
        slug: 'furnaces-lennox',
        description:
          'Lennox furnaces are engineered for high efficiency, offering reliable heating solutions that can reduce energy costs during cold seasons. Known for quiet operation and durability, they are a trusted choice in both homes and commercial buildings.',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carrier',
        slug: 'furnaces-carrier',
        description:
          'Carrier furnaces are recognized for delivering consistent heat distribution and energy savings. They incorporate advanced technology to maintain a comfortable indoor climate, especially suitable for harsh winter conditions.',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Amana Goodman',
        slug: 'furnaces-amana-goodman',
        description:
          'Amana Goodman furnaces provide reliable warmth with an emphasis on value and quality. Built to handle heavy use, these furnaces are known for their sturdy construction and efficient performance.',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Heat Pumps Subcategories
      {
        name: 'Lennox',
        slug: 'heat-pumps-lennox',
        description:
          'Lennox heat pumps provide an energy-efficient way to maintain indoor comfort year-round by heating and cooling spaces as needed. Known for advanced technology, Lennox systems help reduce environmental impact while providing reliable performance.',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carrier',
        slug: 'heat-pumps-carrier',
        description:
          'Carrier heat pumps offer versatile temperature control, allowing seamless switching between heating and cooling. Ideal for moderate climates, Carrier heat pumps are known for efficiency and quiet operation, making them popular in residential settings.',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Amana Goodman',
        slug: 'heat-pumps-amana-goodman',
        description:
          'Amana Goodman heat pumps are designed for reliable performance and affordability, providing heating and cooling solutions that balance cost and efficiency. They are popular for home use, offering consistent temperature control across seasons.',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'King Home',
        slug: 'heat-pumps-king-home',
        description:
          'King Home heat pumps provide an efficient option for temperature regulation, combining both cooling and heating functionalities. Ideal for those looking for a compact, energy-conscious solution, King Home units are dependable and easy to maintain.',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Water Heaters Subcategories
      {
        name: 'Rheem',
        slug: 'water-heaters-rheem',
        description:
          'Rheem water heaters are known for their reliable hot water supply and efficient performance. Offering both tank and tankless options, Rheem heaters provide dependable heating for residential and commercial needs with a focus on energy savings.',
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Navien',
        slug: 'water-heaters-navien',
        description:
          'Navien water heaters specialize in high-efficiency, tankless water heating solutions. These units provide endless hot water on demand and are designed to save space and reduce energy consumption, ideal for eco-conscious consumers.',
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rinnai',
        slug: 'water-heaters-rinnai',
        description:
          'Rinnai water heaters provide reliable hot water solutions with a reputation for innovation and efficiency. Their tankless models offer a continuous supply of hot water, perfect for households and businesses aiming for high-performance heating systems.',
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Giant',
        slug: 'water-heaters-giant',
        description:
          'Giant water heaters are designed for reliability and efficient water heating, offering both electric and gas models. Known for durability, Giant heaters are ideal for long-lasting performance in a range of residential and commercial applications.',
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'AO Smith',
        slug: 'water-heaters-ao-smith',
        description:
          'AO Smith water heaters are recognized for their robust build and high-quality performance. Available in various capacities, AO Smith models are suitable for both residential and industrial use, delivering consistent and efficient hot water.',
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('SubCategories', null, {});
  },
};
