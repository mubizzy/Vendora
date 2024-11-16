const { required, isPosNumRequired } = require('../../helpers');
const { validate } = require('../../middlewares');

exports.upsert = [
  required('title'),

  isPosNumRequired('percentage', 'Percentage'),

  required('expiredAt')
    .isISO8601()
    .withMessage('error-invalid-date')
    .custom((value) => {
      const expirationDate = new Date(value);
      if (expirationDate <= new Date()) {
        throw new Error('error-expiredAt-future-date');
      }
      return true;
    })
    .withMessage('error-expiredAt-future-date'),

  // required('applicableProducts', 'Applicable products')
  //   .isArray()
  //   .withMessage('error-applicable-products-is-an-array')
  //   .custom((value) => {
  //     if (!value.every(Number.isInteger)) {
  //       throw new Error('error-applicable-products-id-integer');
  //     }
  //     return true;
  //   }),

  validate,
];
