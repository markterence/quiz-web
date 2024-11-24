/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */
const moment = require('moment');
const generateMailConfig = require('../api/services/utils/generate-mail-config')
module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // mailgunDomain: 'transactional-mail.example.com',
  // mailgunSecret: 'key-testkeyb183848139913858e8abd9a3',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  upload: {
    maxBytes: 30000000,
    uploadBaseUrl: process.env.UPLOAD_SERVER_URL,
    uploadDirectory: process.env.UPLOAD_DIR
  },

  // JSON Web Token
  // Configure JWT secret and set token expiration
  jwt: {
    secret: process.env.APP_KEY,
    exp: {
      years: 0,
      quarters:0,
      month:0,
      weeks:0,
      days:2,
      hours:0,
      minutes:0,
      seconds:0,
      milliseconds:0
    }
  },

  // =================================
  //
  // SMTP Configuration (nodemailer)
  // =================================

  // `mailerconf`: Value should be one of the keys defined in `mailer` object.
  // Default: "gmail"
  mailerconf: process.env.NODEMAILER_NAME || 'gmail',

  // `mailer`: define fixed SMTP provider configuration here.
  // Also you can use `custom` on `mailerconf` and define the `MAIL_` environment variables
  // The object keys are used as identifier by `mailerconf`.
  mailer: {
    custom: generateMailConfig(),

    // Ethereal (https://ethereal.email) is a sandbox and development only SMTP serivce.
    // We recommend that you use this during development as this is easier to setup than GMail.
    ethereal: {
      auth: {
        user: 'c62ror3jtx7z7xnq@ethereal.email',
        pass: 'CqGBMsdfV9fKExydFx',
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      },
      port: 587,
      host: 'smtp.ethereal.email'
    },

    // For production use only.
    sendgrid: {
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASS
      }
    },

    // GMail aslo provides SMTP service. however you need to tweak your Google account setting
    // for the service to work.
    // For experimental use for development and NOT recommended for production.
    gmail: {
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      auth: {
        user: process.env.SMTP_GMAIL_USER,
        pass: process.env.SMTP_GMAIL_PASS
      },
      tls:{
        rejectUnauthorized: false
      }
    }
  }
};
