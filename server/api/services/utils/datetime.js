const moment = require('moment');
const MYSQL_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const MYSQL_DATE_FORMAT = 'YYYY-MM-DD';

module.exports = {
  MYSQL_DATETIME_FORMAT,
  MYSQL_DATE_FORMAT,

  /**
   * Format input date as "YYYY-MM-DD hh:mm:ss"
   * @param {String|moment.MomentInput} datetime
   */
  dateTimeFormat: function(
    datetime = moment.now(),
    format = MYSQL_DATETIME_FORMAT
  ) {
    return moment(datetime).format(format);
  },

  /**
   * Format input date as "YYYY-MM-DD"
   * @param {String|moment.MomentInput} date
   */
  dateFormat: function(date = moment.now(), format = MYSQL_DATE_FORMAT) {
    return moment(date).format(format);
  },
};
