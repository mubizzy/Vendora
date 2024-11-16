const { required, isNumRequired, isPosNumRequired } = require('../../helpers');
const { validate } = require('../../middlewares');

const upsert = [
  required('review'),

  isPosNumRequired('productId', 'Product ID'),

  isNumRequired('rating')
    .isFloat({ min: 0, max: 5 })
    .withMessage('error-rating-range'),
];

exports.add = [...upsert, validate];

exports.update = [
  ...upsert,
  required('status', 'Status')
    .isIn(['pending', 'active'])
    .withMessage('Status must be either pending or active'),
  validate,
];

exports.status = [
  required('status', 'Status')
    .isIn(['pending', 'active'])
    .withMessage('Status must be either pending or active'),

  validate,
];
