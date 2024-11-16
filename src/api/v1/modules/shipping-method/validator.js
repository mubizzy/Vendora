const { required, isPosNumRequired } = require('../../helpers');
const { validate } = require('../../middlewares');

exports.upsert = [
  required('name'),

  isPosNumRequired('cost', 'Cost'),

  isPosNumRequired('estimatedDelivery', 'Estimated delivery'),

  validate,
];
