const { required } = require('../../helpers');
const { validate } = require('../../middlewares');

exports.create = [required('name', 'Name'), validate];
