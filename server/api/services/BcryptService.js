const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

module.exports = {
  hash: function(input) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(input, SALT_ROUNDS, function(err, hashedValue) {
        return err ? reject(err) : resolve(hashedValue);
      });
    });
  },

  compare: function(input, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(input, hash, function(err, result) {
        return err ? reject(err) : resolve(result);
      });
    });
  },
};
