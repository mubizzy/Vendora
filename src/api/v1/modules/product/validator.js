/* eslint-disable security/detect-object-injection */
const { required, isPosNumRequired } = require('../../helpers/validator');
const { validate } = require('../../middlewares');

exports.productUpsert = [
  required('title', 'Title'),

  required('type'),

  required('status', 'Status')
    .isIn(['published', 'unpublished'])
    .withMessage('Status must be either published or unpublished'),

  required('thumbnail', 'Thumbnail'),

  isPosNumRequired('discountPercentage', 'Discount percentage'),

  isPosNumRequired('categoryId', 'Category ID'),

  isPosNumRequired('subCategoryId', 'Sub category ID'),

  isPosNumRequired('variant.*.buyingPrice', 'Buying Price'),

  isPosNumRequired('variant.*.sellingPrice', 'Selling Price').custom(
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

exports.status = [
  ...idValidator,

  required('status', 'Status')
    .isIn(['published', 'unpublished'])
    .withMessage('Status must be either published or unpublished'),

  validate,
];

exports.bestDeal = [...idValidator, validate];
