const { isPosNumRequired } = require('../../helpers');
const { validate } = require('../../middlewares');

exports.upsert = [isPosNumRequired('percentage', 'Percentage'), validate];
