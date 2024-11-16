const { successResponse } = require('../../helpers');
const utils = require('../../utils');
const queue = require('../../tasks/queue');
const constants = require('../../constants');

class ContactController {
  static async contact(req, res, next) {
    try {
      const template = utils.authEmailTemplate.contact({ contact: req.body });
      queue.sendEmail(constants.TASK.JOB.SEND_EMAIL, { template });

      successResponse({
        res,
        msg: 'succ-send-contact-message',
        statusCode: 200,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ContactController;
