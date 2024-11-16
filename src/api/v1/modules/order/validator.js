const { required, isPosNumRequired, isNumRequired } = require('../../helpers');
const { validate } = require('../../middlewares');

exports.upsert = [
  isNumRequired('tax', 'Tax'),

  isNumRequired('shippingCharge', 'Shipping charge'),

  isPosNumRequired('subTotal', 'Sub total'),

  isPosNumRequired('total', 'Total'),

  required('address'),

  required('variants'),

  required('billingAddress'),

  required('paymentInfo'),

  required('shippingMethod'),

  validate,
];

exports.status = [
  required('status', 'Status')
    .isIn(['delivering', 'delivered', 'cancel'])
    .withMessage('Status must be either delivering or delivered or cancel'),

  validate,
];
