const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const config = require('../config/global');
const logger = require('../config/logger');

sgMail.setApiKey(config.SENDGRID_API_KEY);

const sendEmail = async ({
  from = config.MAIL_FROM,
  to,
  subject,
  text = '',
  html = '',
  attachments = [],
} = {}) => {
  if (to && subject && (text || html)) {
    const companyLogo = path.join(__dirname, '../assets/logo.jpg');
    const logoAttachment = {
      content: fs.readFileSync(companyLogo).toString('base64'),
      filename: 'companyLogo.jpg',
      type: 'image/jpeg',
      disposition: 'inline',
      content_id: 'companyLogo',
    };

    const msg = {
      from: from || config.MAIL_FROM,
      to,
      subject,
      attachments: [logoAttachment, ...attachments],
    };

    if (html) msg.html = html;
    else if (text) msg.text = text;

    sgMail
      .send(msg)
      .then(() => {
        logger.info(`Email sent from ${msg.from} to ${to}`);
      })
      .catch((error) => {
        logger.error(error);
      });
  } else {
    throw new Error(
      "To send an email 'to', 'subject', 'text' or 'html' parameters are required",
    );
  }
};

module.exports = { sendEmail };
