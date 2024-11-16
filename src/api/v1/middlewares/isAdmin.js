const { forbiddenError } = require('../errors');

module.exports = (req, res, next) => {
  try {
    const { user } = req;
    if (user?.role === 1) {
      return next();
    }
    forbiddenError(req.__('permission-denied'));
  } catch (error) {
    next(error);
  }
};
