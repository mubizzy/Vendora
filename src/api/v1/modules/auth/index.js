const router = require('express').Router();
const AuthController = require('./controller');
const validator = require('./validator');
const middlewares = require('../../middlewares');
const { RATE_LIMIT } = require('../../constants');

router.post(
  '/signup',
  validator.signupValidator,
  middlewares.validate,
  AuthController.signup,
);

router.post(
  '/signin',
  validator.signinValidator,
  middlewares.validate,
  middlewares.rateLimit([
    RATE_LIMIT.KEY_LOGIN_IP,
    RATE_LIMIT.KEY_LOGIN_EMAIL,
    RATE_LIMIT.KEY_LOGIN_EMAIL_IP,
    RATE_LIMIT.KEY_VERIFY_EMAIL,
  ]),
  AuthController.signin,
);

router.get('/current-user', middlewares.isAuth, AuthController.currentUser);

router.post(
  '/refresh-token',
  middlewares.verifyRefreshToken,
  AuthController.generaterefreshToken,
);

router.post(
  '/resend-email-verification-token',
  validator.emailValidator,
  middlewares.validate,
  middlewares.rateLimit([RATE_LIMIT.KEY_VERIFY_EMAIL]),
  AuthController.resendEmailVerificationCode,
);

router.post(
  '/email-verification',
  validator.verifyEmailValidator,
  middlewares.validate,
  AuthController.emailVerification,
);

router.post(
  '/forgot-password',
  validator.emailValidator,
  middlewares.validate,
  middlewares.rateLimit([RATE_LIMIT.KEY_FORGOT_PASSWORD_EMAIL]),
  AuthController.forgotPassword,
);

router.post(
  '/reset-password',
  validator.resetPasswordValidator,
  middlewares.validate,
  AuthController.resetPassword,
);

router.put(
  '/change-password',
  middlewares.isAuth,
  validator.changePasswordValidator,
  middlewares.validate,
  AuthController.changePassword,
);

router.put(
  '/user-status',
  middlewares.isAuth,
  middlewares.isAdmin,
  validator.updateStatus,
  middlewares.validate,
  AuthController.updateStatus,
);

router.put(
  '/update-vendor-info/:id',
  middlewares.isAuth,
  middlewares.isModerator,
  validator.updateVendorInfo,
  middlewares.validate,
  AuthController.updateVendorInfo,
);

router.put(
  '/verify-vendor/:id',
  middlewares.isAuth,
  middlewares.isAdmin,
  AuthController.verifyVendor,
);

router.post(
  '/list',
  middlewares.isAuth,
  middlewares.isAdmin,
  middlewares.verifyRefreshToken,
  AuthController.userList,
);

router.get('/detail/:id', AuthController.userDetail);

router.delete('/:id', middlewares.isAuth, AuthController.deleteUser);

router.get('/signout', middlewares.verifyRefreshToken, AuthController.signout);

module.exports = router;
