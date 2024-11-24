let jwt = require('jwt-simple');
const moment = require('moment');
const empty = require('is-empty');

let jwt_key = sails.config.custom.jwt.secret;
let jwt_exp = sails.config.custom.jwt.exp;

module.exports = {
  createToken: function (payload, expiration) {
    // Set Token Expiration (expiration must be in seconds)
    let exp = Math.floor(
      moment()
        .add(expiration || jwt_exp)
        .valueOf() / 1000
    );

    let payloadData = Object.assign(payload, { exp: exp });

    sails.log.debug(`JwtService: ` + JSON.stringify(payloadData));

    return jwt.encode(payloadData, jwt_key, 'HS256');
  },

  decodeToken: function (token) {
    return decodeToken(token);
  },
  decodeAuthHeader: function (header) {
    return empty(header) ? false : decodeToken(header.split(' ')[1]);
  },
};

function decodeToken(token) {
  try {
    return jwt.decode(token, sails.config.custom.jwt.secret, false, 'HS256');
  } catch (error) {
    sails.log.debug(error);
    return false;
  }
}
