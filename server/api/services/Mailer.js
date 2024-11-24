var nodemailer = require('nodemailer');
var ejs = require('ejs');

/**
 * @module services/Mailer
 * @description Initialize and Sends email.
 */
module.exports = {
  /**
   * Initialize nodemailer<br>
   * Uses the <code>mailer</code> defined in <code>mailerconf</code> key in <code>config/local.js</code>
   * <br><code>sails.config.globals.mailer[sails.config.globals.mailerconf]</code><br>
   * Sets the global variable transporter <code>sails.config.globals.transporter</code> in sails bootstrap code.
   * @instance
   */
  initTransporter: () => {
    sails.config.globals.transporter = nodemailer.createTransport(
      sails.config.custom.mailer[sails.config.custom.mailerconf]
    );
  },

  /**
   * Basic Send Mail Function
   * @instance
   */
  sendMail: _sendMail,

  sendExampleEmail: (from, to, content, subject, attachments) => {
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        'config/email-templates/example.ejs',
        {
          content: content,
        },
        (err, str) => {
          if (err) {
            sails.log.error(err);
            return reject(err);
          }
          _sendMail(from, to, subject, '', str, attachments)
            .then((sent) => {
              return resolve(sent);
            })
            .catch((sendError) => {
              return reject(sendError);
            });
        }
      );
    });
  },
};

/**
 * @param {string} from
 * @param {string} to
 * @param {string} subject Email Subject
 * @param {string} text If plain text email body
 * @param {string} html If the email body contains HTML tag
 */
function _sendMail(from, to, subject, text, html, attachments) {
  return new Promise((resolve, reject) => {
    let mailOpts = {
      from: from,
      to: to,
      subject: subject,
      text: text,
      html: html,
      attachments: attachments,
    };

    sails.config.globals.transporter.sendMail(mailOpts, (err, info) => {
      if (err) {
        sails.log.error(err);
        return reject(err);
      }

      sails.log.info(`Message sent %s`, info);
      sails.log.debug(`PreviewURL: %s`, nodemailer.getTestMessageUrl(info));
      resolve(info);
    });
  });
}
