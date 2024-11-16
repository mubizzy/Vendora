const { isPosNumRequired } = require('../../helpers/validator');
const { validate } = require('../../middlewares');

exports.cartUpsert = [
  isPosNumRequired('variantId', 'Variant ID'),

  isPosNumRequired('quantity', 'Quantity'),

  validate,
];
