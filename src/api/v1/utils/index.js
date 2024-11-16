const getModules = require('./get-modules');
const generateCode = require('./generate-code');
const removeBlankAttributes = require('./remove-blank-attributes');
const indexPrefix = require('./index-prefix');
const saveCookie = require('./save-cookie');
const clearCookie = require('./clear-cookie');
const jwtToken = require('./jwt-token');
const hashPassword = require('./hash-password');
const comparePassword = require('./compare-password');
const modifyObjectValue = require('./modify-object-value');
const deleteObjectPropery = require('./delete-object-property');
const authEmailTemplate = require('./email-template/auth-email-template');
const verifyToken = require('./verify-token');
const timestampWithTimezone = require('./timestamp-with-timezon');
const convertCase = require('./convertCase');
const createSlug = require('./create-slug');
const excludeProperties = require('./exclude-properties');
const generateStringCode = require('./generate-string-code');

module.exports = {
  getModules,
  generateCode,
  removeBlankAttributes,
  indexPrefix,
  saveCookie,
  clearCookie,
  jwtToken,
  hashPassword,
  comparePassword,
  modifyObjectValue,
  deleteObjectPropery,
  authEmailTemplate,
  verifyToken,
  timestampWithTimezone,
  ...convertCase,
  createSlug,
  excludeProperties,
  generateStringCode,
};
