const SubscriptionService = require('./service');
const errors = require('../../errors');
const { successResponse } = require('../../helpers');
const queue = require('../../tasks/queue');
const constants = require('../../constants');
const utils = require('../../utils');

class SubscriptionController {
  static async list(req, res, next) {
    try {
      const data = await SubscriptionService.listSubscription(req.body);

      successResponse({
        res,
        msg: 'succ-subscription-list',
        ...data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { email } = req.body;

      const { data: existingSubscription } =
        await SubscriptionService.findOneSubscription({
          email,
        });
      if (existingSubscription) {
        errors.badRequestError(req.__('error-email-already-use'));
      }

      const { data: subscription } = await SubscriptionService.addSubscription(
        req.body,
      );

      const template = utils.authEmailTemplate.subscriptionConfirmation({
        subscription,
      });
      queue.sendEmail(constants.TASK.JOB.SEND_EMAIL, { template });

      successResponse({
        res,
        msg: 'succ-add-subscription',
        statusCode: 201,
        subscription,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;

      const data = await SubscriptionService.deleteSubscription({ id });
      if (data === 0) {
        errors.notFoundError('error-user-not-found');
      }

      successResponse({
        res,
        msg: 'succ-subscription-delete',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SubscriptionController;
