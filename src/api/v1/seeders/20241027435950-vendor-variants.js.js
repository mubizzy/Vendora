const { generateCode } = require('../utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const createVariant = (
      vendorProductId,
      size,
      color,
      buyingPrice = 250,
      sellingPrice = 300,
      weight = '20kg',
      height = '1.5"',
      length = `2"`,
      width = '1.5"',
      quantity = 0,
    ) => ({
      vendorProductId,
      size,
      color,
      buyingPrice,
      sellingPrice,
      sku: `SKU-${generateCode(5)}`,
      barcode: `BAR-${generateCode(5)}`,
      ean: `EAN-${generateCode(5)}`,
      upc: `UPC-${generateCode(5)}`,
      hsCode: `HS-${generateCode(5)}`,
      midCode: `MID-${generateCode(5)}`,
      weight,
      length,
      height,
      width,
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity,
    });

    const variants = [
      // product id: 1
      createVariant(
        1,
        'S',
        'White',
        250,
        300,
        '20kg',
        '1.5"',
        '2"',
        '1.5"',
        100,
      ),

      createVariant(
        1,
        'M',
        'Gray',
        250,
        300,
        '20kg',
        '1.5"',
        '2"',
        '1.5"',
        100,
      ),

      createVariant(
        1,
        'L',
        'Blue',
        250,
        300,
        '20kg',
        '1.5"',
        '2"',
        '1.5"',
        100,
      ),

      createVariant(
        1,
        'XL',
        'Blue',
        250,
        300,
        '20kg',
        '1.5"',
        '2"',
        '1.5"',
        100,
      ),

      // product id: 2
      createVariant(
        2,
        'S',
        'White',
        275,
        315,
        '30kg',
        '2.5"',
        '3"',
        '2.5"',
        90,
      ),

      createVariant(2, 'M', 'Gray', 275, 315, '30kg', '2.5"', '3"', '2.5"', 90),

      createVariant(
        2,
        'L',
        'Black',
        275,
        315,
        '30kg',
        '2.5"',
        '3"',
        '2.5"',
        90,
      ),

      // product id: 3
      createVariant(
        3,
        'S',
        'White',
        275,
        315,
        '30kg',
        '2.5"',
        '3"',
        '2.5"',
        90,
      ),

      createVariant(3, 'M', 'Gray', 250, 300, '20kg', '1.5"', '2"', '1.5"', 90),

      // product id: 4
      createVariant(
        4,
        'S',
        'White',
        250,
        300,
        '20kg',
        '1.5"',
        '2"',
        '1.5"',
        90,
      ),

      createVariant(4, 'M', 'Gray', 350, 350, '25kg', '2"', '2.5"', '2"', 90),

      // product id: 5
      createVariant(
        5,
        'S',
        'Green',
        250,
        300,
        '20kg',
        '1.5"',
        '2"',
        '1.5"',
        80,
      ),

      createVariant(5, 'M', 'Gray', 250, 300, '20kg', '1.5"', '2"', '1.5"', 80),

      createVariant(
        5,
        'L',
        'Black',
        250,
        300,
        '20kg',
        '1.5"',
        '2"',
        '1.5"',
        80,
      ),

      createVariant(5, 'XXL', '', 250, 300, '20kg', '1.5"', '2"', '1.5"', 80),

      // product id: 6
      createVariant(
        6,
        'S',
        'Green',
        250,
        300,
        '20kg',
        '1.5"',
        '2"',
        '1.5"',
        100,
      ),

      createVariant(6, 'M', 'Gray', 250, 300, '20kg', '1.5"', '2"', '1.5"', 0),

      createVariant(6, 'L', 'Black', 250, 300, '20kg', '1.5"', '2"', '1.5"', 0),

      createVariant(6, 'XL', '', 250, 300, '20kg', '1.5"', '2"', '1.5"', 0),
    ];

    await queryInterface.bulkInsert('VendorVariants', variants);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('VendorVariants', null, {});
  },
};
