const { body, param, query, header, cookie } = require('express-validator');
const utils = require('../utils');

class Validator {
  constructor(field, fieldName = null, location = body) {
    this.chain = location(field);
    this.field = field;
    this.fieldName = fieldName || utils.capitalize(field);
  }

  generateMessage(msg) {
    return typeof msg === 'object' && msg.key
      ? {
          key: msg.key,
          field:
            msg.field ||
            utils.capitalize(this.fieldName) ||
            utils.capitalize(this.field),
        }
      : msg;
  }

  required() {
    this.chain = this.chain
      .notEmpty()
      .withMessage(this.generateMessage({ key: 'val-field-required' }));
    return this.chain;
  }

  checkNumeric() {
    this.chain = this.chain
      .isNumeric()
      .withMessage(this.generateMessage({ key: 'val-numeric-value' }));
    return this.chain;
  }

  isIn(values) {
    this.chain = this.chain
      .isIn(values)
      .withMessage(this.generateMessage({ key: 'val-invalid-value' }));
    return this.chain;
  }

  checkEmail() {
    this.chain = this.chain
      .isEmail()
      .withMessage(this.generateMessage({ key: 'val-invalid-email' }));
    return this.chain;
  }

  checkPassword(length) {
    this.chain = this.chain
      .trim()
      .isLength(length)
      .withMessage(this.generateMessage({ key: 'val-password-requirement' }));
    return this.chain;
  }

  checkLength(length) {
    this.chain = this.chain
      .isLength(length)
      .withMessage(this.generateMessage({ key: 'val-length-requirement' }));
    return this.chain;
  }
}

exports.required = (field, fieldName = null, location = body) =>
  new Validator(field, fieldName, location).required();

exports.isEmail = (field = 'email', fieldName = 'Email', location = body) =>
  new Validator(field, fieldName, location).checkEmail();

exports.isEmailRequired = (
  field = 'email',
  fieldName = 'Email',
  location = body,
) =>
  new Validator(field, fieldName, location)
    .required()
    .isEmail()
    .withMessage({ key: 'val-invalid-email' });

exports.isNumeric = (field, fieldName = null, location = body) =>
  new Validator(field, fieldName, location).checkNumeric();

exports.isNumRequired = (field, fieldName = null, location = body) =>
  new Validator(field, fieldName, location)
    .required()
    .isNumeric()
    .withMessage({ key: 'val-numeric-value', field: fieldName });

exports.isPosNumRequired = (field, fieldName = null, location = body) =>
  new Validator(field, fieldName, location)
    .required()
    .isFloat({ gt: 0 })
    .withMessage({ key: 'val-positive-numeric-value', field: fieldName });

exports.isPassword = (
  field = 'password',
  fieldName = 'Password',
  location = body,
  length = { min: 6, max: 64 },
) => new Validator(field, fieldName, location).checkPassword(length);

exports.validator = (field, fieldName = null, location = body) =>
  new Validator(field, fieldName, location);

exports.body = body;
exports.param = param;
exports.query = query;
exports.header = header;
exports.cookie = cookie;
