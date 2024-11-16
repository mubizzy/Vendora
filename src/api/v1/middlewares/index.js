const processRequest = require('./process-request');
const notFoundRequest = require('./not-found-request');
const handleError = require('./handle-error');
const validate = require('./validate-request');
const verifyRefreshToken = require('./verify-refresh-token');
const isAuth = require('./isAuth');
const isAdmin = require('./isAdmin');
const isModerator = require('./isModerator');
const rateLimit = require('./rate-limit');
const upload = require('./upload-file');

module.exports = {
  processRequest,
  notFoundRequest,
  handleError,
  validate,
  verifyRefreshToken,
  isAuth,
  isAdmin,
  isModerator,
  rateLimit,
  upload,
};
