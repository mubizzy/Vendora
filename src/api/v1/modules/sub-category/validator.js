const { required, isNumRequired } = require('../../helpers');
const { validate } = require('../../middlewares');

exports.createOrUpdate = [
  required('name'),

  isNumRequired('categoryId', 'Category ID'),

  validate,
];
