const { isPosNumRequired } = require('../../helpers');
const { validate } = require('../../middlewares');

exports.upsert = [isPosNumRequired('upFrontPay', 'Up front pay'), validate];
