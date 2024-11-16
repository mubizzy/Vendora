/* eslint-disable security/detect-object-injection */
const { isPosNumRequired, isNumRequired } = require('../../helpers/validator');
const { validate } = require('../../middlewares');

exports.vendorProductUpsert = [
  isPosNumRequired('productId', 'Product ID'),

  isNumRequired('discountPercentage', 'Discount percentage'),

  isNumRequired('variant.*.quantity', 'Quantity'),

  isNumRequired('variant.*.buyingPrice', 'Buying Price'),

  isNumRequired('variant.*.sellingPrice', 'Selling Price').custom(
    async (sellingPrice, { req, path }) => {
      const index = path.split('[')[1].split(']')[0];
      const buyingPrice = parseFloat(req.body.variant[index].buyingPrice);

      if (sellingPrice < buyingPrice) {
        throw new Error('Selling price must be higher than buying price');
      }
      return true;
    },
  ),

  validate,
];

const idValidator = [isPosNumRequired('id', 'Product ID')];

exports.bestDeal = [...idValidator, validate];
