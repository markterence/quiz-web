const crypto = require('crypto');

const computeMD5Hash = function(email) {
  const hash = crypto.createHash('md5');
  const md5 = hash
    .update(
      email
        .toString()
        .trim()
        .toLowerCase()
    )
    .digest('hex');
  return md5;
};

const getAvatarURL = function(email, d = 'identicon') {
  const md5Hash = computeMD5Hash(email);
  return `https://www.gravatar.com/avatar/${md5Hash}?d=${d}`;
};

const getProfile = function(email) {
  return `https://www.gravatar.com/${computeMD5Hash(email)}.json`;
};

module.exports = {
  computeMD5Hash,
  getAvatarURL,
  getProfile,
};
