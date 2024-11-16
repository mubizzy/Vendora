const {
  required,
  isPassword,
  isPosNumRequired,
  isEmailRequired,
} = require('../../helpers');
const { newError } = require('../../errors');

const emailAndTokenValidator = [
  isEmailRequired('email', 'Email'),
  required('token', 'Token'),
];

exports.signupValidator = [
  required('firstName', 'First name'),
  required('lastName', 'Last name'),
  required('role', 'Role'),
  isEmailRequired(),
  isPassword(),
];

exports.verifyEmailValidator = emailAndTokenValidator;

exports.resetPasswordValidator = [...emailAndTokenValidator, isPassword()];

exports.signinValidator = [isEmailRequired(), required('password')];

exports.emailValidator = [isEmailRequired()];

exports.codeValidator = [required('code')];

exports.passwordValidator = [isPassword()];

exports.changePasswordValidator = [
  required('oldPassword', 'Old password'),

  isPassword('newPassword', 'New password').custom(
    async (newPassword, metadata) => {
      const { oldPassword } = metadata.req.body;

      if (oldPassword === newPassword) {
        newError('val-old-and-new-password-not-same');
      }
    },
  ),
];

exports.updateStatus = [
  required('active').isBoolean().withMessage('error-active-boolen'),

  isPosNumRequired('id', 'User ID'),
];

exports.updateVendorInfo = [required('companyName', 'Company name')];
