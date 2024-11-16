const { successResponse } = require('../../helpers');
const AuthService = require('./service');
const errors = require('../../errors');
const utils = require('../../utils');
const config = require('../../../../config/global');
const constants = require('../../constants');
const queue = require('../../tasks/queue');
const { redis } = require('../../services');

class AuthController {
  static async signup(req, res, next) {
    try {
      const { email } = req.body;

      const { data: userExist } = await AuthService.findOneUser({ email });
      if (userExist) {
        errors.badRequestError(req.__('error-email-already-use'));
      }

      const { user, detailUser } = await AuthService.createUser({
        payload: req.body,
      });

      const template = utils.authEmailTemplate.signup({
        user: detailUser,
      });
      queue.sendEmail(constants.TASK.JOB.SEND_EMAIL, { template });

      /**
       * @todo
       * activity log
       */

      successResponse({
        res,
        msg: 'succ-signup',
        statusCode: 201,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const { data: userExist, instance } = await AuthService.findOneUser({
        email,
      });
      if (!userExist) {
        await AuthService.authLimiter(req);
        errors.unauthorizedError(req.__('error-invalid-credentials'));
      }

      const matchPassword = await utils.comparePassword(
        userExist.password,
        password,
      );
      if (!matchPassword) {
        await AuthService.authLimiter(req);
        errors.unauthorizedError(req.__('error-invalid-credentials'));
      }

      const { accessToken, refreshToken } = await utils.jwtToken(userExist);
      await redis.set(refreshToken, true, config.JWT_REFRESH_TOKEN_EXPIRED_IN);
      utils.saveCookie({ res, accessToken, refreshToken });
      const { data: user } = await AuthService.lastLogin({ instance });

      /**
       * @todo
       * activity log
       */

      successResponse({
        res,
        msg: 'succ-signin',
        user: { ...user, verified: user.verified },
        token: { accessToken, refreshToken },
      });
    } catch (error) {
      next(error);
    }
  }

  static async currentUser(req, res) {
    successResponse({
      res,
      msg: 'succ-current-user',
      user: req.user,
    });
  }

  static async generaterefreshToken(req, res, next) {
    try {
      const { accessToken, refreshToken } = await utils.jwtToken(req.user);
      await redis.del(req.cookies.refreshToken);
      await redis.set(refreshToken, true, config.JWT_REFRESH_TOKEN_EXPIRED_IN);
      utils.saveCookie({ res, accessToken, refreshToken });

      /**
       * @todo
       * activity log
       */

      successResponse({
        res,
        msg: 'succ-generate-refresh-token',
        token: { accessToken, refreshToken },
      });
    } catch (error) {
      next(error);
    }
  }

  static async resendEmailVerificationCode(req, res, next) {
    try {
      const { email } = req.body;

      const { data: userExist, instance } = await AuthService.findOneUser({
        email,
      });
      if (!userExist) {
        errors.badRequestError(req.__('error-user-not-found'));
      }

      if (userExist.verified) {
        errors.badRequestError(req.__('error-email-verified'));
      }

      await AuthService.resendEmailVerificationCodeLimiter(req);
      const { token } = await AuthService.generateVerifyEmailToken({
        instance,
      });

      const template = utils.authEmailTemplate.resendEmailVerificationToken({
        user: userExist,
        token,
      });
      queue.sendEmail(constants.TASK.JOB.SEND_EMAIL, { template });

      /**
       * @todo
       * activity log
       */

      successResponse({
        res,
        msg: 'succ-resend-email-verification-token',
      });
    } catch (error) {
      next(error);
    }
  }

  static async emailVerification(req, res, next) {
    try {
      const { email, token } = req.body;

      const { data: userExist, instance } = await AuthService.findOneUser({
        email,
      });
      if (!userExist) {
        errors.badRequestError(req.__('error-user-not-found'));
      }

      if (userExist.verified) {
        errors.badRequestError(req.__('error-email-verified'));
      }

      const { key } = await AuthService.verifyEmail({
        instance,
        data: userExist,
        token,
      });
      if (key) {
        errors.badRequestError(req.__(key));
      }

      const template = utils.authEmailTemplate.emailVerificationConfirmation({
        user: userExist,
      });
      queue.sendEmail(constants.TASK.JOB.SEND_EMAIL, { template });

      /**
       * @todo
       * activity log
       */

      successResponse({
        res,
        msg: 'succ-verify-email',
      });
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      const { data: userExist, instance } = await AuthService.findOneUser({
        email,
      });
      if (!userExist) {
        errors.badRequestError(req.__('error-user-not-found'));
      }

      await AuthService.forgotPasswordEmailLimiter(req);
      const { token } = await AuthService.generateForgotPasswordToken({
        instance,
      });

      const template = utils.authEmailTemplate.forgotPasswordToken({
        user: userExist,
        token,
      });
      queue.sendEmail(constants.TASK.JOB.SEND_EMAIL, { template });

      /**
       * @todo
       * activity log
       */

      successResponse({
        res,
        msg: 'succ-send-forgot-password-token',
      });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { email, token, password } = req.body;

      const { data: userExist, instance } = await AuthService.findOneUser({
        email,
      });
      if (!userExist) {
        errors.badRequestError(req.__('error-user-not-found'));
      }

      const { key } = await AuthService.verifyPasswordResetToken({
        data: userExist,
        token,
      });
      if (key) {
        errors.badRequestError(req.__(key));
      }

      await AuthService.resetPassword({ instance, password });

      const template = utils.authEmailTemplate.resetPassword({
        user: userExist,
      });
      queue.sendEmail(constants.TASK.JOB.SEND_EMAIL, { template });

      /**
       * @todo
       * activity log
       */

      successResponse({
        res,
        msg: 'succ-password-reset',
      });
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;

      const { data: userExist, instance } = await AuthService.findOneUser({
        email: req.user.email,
      });
      if (!userExist) {
        errors.badRequestError(req.__('error-user-not-found'));
      }

      const oldMatchPassword = await utils.comparePassword(
        userExist.password,
        oldPassword,
      );
      if (!oldMatchPassword) {
        errors.badRequestError(req.__('error-old-password-not-match'));
      }

      await AuthService.changePassword({
        instance,
        password: newPassword,
      });

      const template = utils.authEmailTemplate.changePassword({
        user: userExist,
      });
      queue.sendEmail(constants.TASK.JOB.SEND_EMAIL, { template });

      /**
       * @todo
       * activity log
       */

      successResponse({
        res,
        msg: 'succ-change-password',
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { active, id } = req.body;

      const { data: userExist, instance } = await AuthService.findOneUser({
        id,
      });
      if (!userExist) {
        errors.badRequestError(req.__('error-user-not-found'));
      }

      const { data: user } = await AuthService.updateStatus({
        instance,
        active,
      });

      successResponse({
        res,
        msg: 'succ-update-status',
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateVendorInfo(req, res, next) {
    try {
      const { id } = req.params;

      const { data: user, instance } = await AuthService.findOneUser({
        id,
      });
      if (!user) {
        errors.badRequestError(req.__('error-user-not-found'));
      }

      if (user.role !== 2) {
        errors.badRequestError(req.__('error-user-not-a-vendor'));
      }

      const { data: vendor } = await AuthService.updateVendorInfo({
        instance,
        body: req.body,
      });

      successResponse({
        res,
        msg: 'succ-vendor-info-update',
        vendor,
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyVendor(req, res, next) {
    try {
      const { id } = req.params;

      const { data: user, instance } = await AuthService.findOneUser({
        id,
      });
      if (!user) {
        errors.badRequestError(req.__('error-user-not-found'));
      }

      const { data: vendor } = await AuthService.verifyVendor({
        instance,
      });

      successResponse({
        res,
        msg: 'succ-vendor-info-update',
        vendor,
      });
    } catch (error) {
      next(error);
    }
  }

  static async userList(req, res, next) {
    try {
      const data = await AuthService.authList(req.body);

      successResponse({
        res,
        msg: 'succ-user-list',
        ...data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async userDetail(req, res, next) {
    try {
      const { data: user } = await AuthService.findOneUser(
        {
          id: req.params.id,
        },
        {
          exclude: [
            'password',
            'emailVerificationToken',
            'resetPasswordToken',
            'deletedAt',
          ],
        },
      );

      successResponse({
        res,
        msg: 'succ-user-detail',
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const data = await AuthService.deleteUser({ id: req.params.id });
      if (data === 0) {
        errors.notFoundError('error-user-not-found');
      }

      successResponse({
        res,
        msg: 'succ-delete-user',
      });
    } catch (error) {
      next(error);
    }
  }

  static async signout(req, res, next) {
    try {
      await redis.del(req.cookies.refreshToken);
      await redis.set(
        req.cookies.accessToken,
        'true',
        parseInt(config.JWT_ACCESS_TOKEN_EXPIRED_IN, 10),
      );

      utils.clearCookie({ res });
      res.clearCookie('undefined');

      /**
       * @todo
       * activity log
       */

      successResponse({
        res,
        msg: 'succ-signout',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
