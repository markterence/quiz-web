const path = require('path');
const APP_PATH = sails.config.appPath;
const APP_TEMP = path.resolve(APP_PATH, '.tmp');
const UPLOAD_DIR = sails.config.custom.upload.uploadDirectory;

module.exports = {
  APP_PATH,
  APP_TEMP,
  UPLOAD_DIR,
};
