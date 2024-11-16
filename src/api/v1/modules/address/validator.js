const { required, isPosNumRequired } = require('../../helpers');
const { validate } = require('../../middlewares');

exports.upsert = [
  required('phone').isMobilePhone().withMessage('error-invalid-phone'),

  required('address'),

  required('city'),

  required('state'),

  required('country'),

  isPosNumRequired('zipCode', 'Zip Code'),

  validate,
];
