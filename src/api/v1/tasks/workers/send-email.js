const logger = require('../../../../config/logger');
const helpers = require('../../helpers');

module.exports = async (job) => {
  const { template } = job.data;
  try {
    if (template) {
      await helpers.sendEmail(template);
    }
  } catch (error) {
    logger.error(error);
  }
};
