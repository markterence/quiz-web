const generateMailConfig = function() {
  const isSecure = function (mailEncryption) {
    return  mailEncryption ? {secure: mailEncryption === 'tls'} : {}
  }
  let nodemailer = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    },
    ...isSecure(process.env.MAIL_ENCRYPTION),
  }
  return nodemailer;
}

module.exports = generateMailConfig;
