const { isEmailRequired } = require('../../helpers');
const { validate } = require('../../middlewares');

exports.add = [isEmailRequired('email'), validate];
