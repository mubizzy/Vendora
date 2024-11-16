const { generateCode } = require('../utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const createVariant = (
      productId,
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
      productId,
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
      createVariant(1, 'S', 'White', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(1, 'M', 'Gray', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(1, 'L', 'Blue', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(1, 'XL', 'Blue', 250, 300, '20kg', '1.5"', '2"', '1.5"'),

      // product id: 2
      createVariant(2, 'S', 'White', 275, 315, '30kg', '2.5"', '3"', '2.5"'),
      createVariant(2, 'M', 'Gray', 275, 315, '30kg', '2.5"', '3"', '2.5"'),
      createVariant(2, 'L', 'Black', 275, 315, '30kg', '2.5"', '3"', '2.5"'),

      // product id: 3
      createVariant(3, 'S', 'White', 275, 315, '30kg', '2.5"', '3"', '2.5"'),
      createVariant(3, 'M', 'Gray', 250, 300, '20kg', '1.5"', '2"', '1.5"'),

      // product id: 4
      createVariant(4, 'S', 'White', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(4, 'M', 'Gray', 350, 350, '25kg', '2"', '2.5"', '2"'),

      // product id: 5
      createVariant(5, 'S', 'Green', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(5, 'M', 'Gray', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(5, 'L', 'Black', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(5, 'XXL', '', 250, 300, '20kg', '1.5"', '2"', '1.5"'),

      // product id: 6
      createVariant(6, 'S', 'Green', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(6, 'M', 'Gray', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(6, 'L', 'Black', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(6, 'XL', '', 250, 300, '20kg', '1.5"', '2"', '1.5"'),

      // product id: 7
      createVariant(7, 'S', 'White', 200, 300, '26kg', '2.5"', '2.5"', '1.5"'),
      createVariant(7, 'M', 'Gray', 200, 230, '26kg', '2.5"', '2.5"', '2.5"'),
      createVariant(7, 'L', 'Black', 200, 230, '26kg', '2.5"', '2.5"', '2.5"'),

      // product id: 8
      createVariant(8, 'S', 'White', 250, 280, '26kg', '1.5"', '2"', '1.5"'),
      createVariant(8, 'M', 'Gray', 250, 300, '26kg', '1.5"', '2.5`"', '1.5"'),
      createVariant(8, 'L', 'Black', 250, 300, '26kg', '2.5"', '2.5"', '2.5"'),
      createVariant(8, 'XL', 'Blue', 250, 300, '20kg', '2.5"', '2.5"', '2.5"'),

      // product id: 9
      createVariant(9, 'S', 'White', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(10, 'S', 'White', 350, 320, '20kg', '2.5"', '2"', '1.5"'),
      createVariant(11, 'S', 'White', 270, 310, '25kg', '1.5"', '2"', '1.5"'),
      createVariant(12, 'S', 'White', 250, 300, '20kg', '1.5"', '2"', '1.5"'),

      createVariant(13, 'S', 'White', 280, 330, '22kg', '2.5"', '3"', '1.5"'),
      createVariant(14, 'S', 'White', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(15, 'S', 'White', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(16, 'S', 'White', 290, 333, '27kg', '1.6"', '1.9"', '1.8"'),
      createVariant(17, 'S', 'White', 260, 310, '20kg', '2.5"', '2.5"', '1.8"'),
      createVariant(18, 'S', 'White', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(19, 'S', 'White', 270, 320, '30kg', '2.5"', '2.5"', '1.9"'),
      createVariant(20, 'S', 'White', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(21, 'S', 'White', 260, 370, '20kg', '2.5"', '3"', '2.5"'),
      createVariant(22, 'S', 'White', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(23, 'S', 'White', 280, 330, '20kg', '3.5"', '3"', '3.5"'),
      createVariant(24, 'S', 'White', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(25, 'S', 'White', 250, 300, '26kg', '2.5"', '2.5"', '2.5"'),
      createVariant(26, 'S', 'White', 255, 325, '29kg', '1.9"', '3"', '2.5"'),
      createVariant(27, 'S', 'White', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(28, 'S', 'White', 220, 280, '26kg', '1.5"', '2"', '1.5"'),
      createVariant(29, 'S', 'White', 250, 300, '20kg', '1.5"', '2"', '1.5"'),
      createVariant(30, 'S', 'White', 290, 340, '29kg', '2.5"', '3"', '2.5"'),
    ];

    await queryInterface.bulkInsert('ProductVariants', variants);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('ProductVariants', null, {});
  },
};
