const { required, isEmailRequired } = require('../../helpers');
const { validate } = require('../../middlewares');

exports.contact = [
  required('firstName'),

  required('lastName'),

  isEmailRequired(),

  required('phone'),

  required('message'),

  validate,
];
