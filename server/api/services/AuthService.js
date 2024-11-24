module.exports = {
  getUserID: function (req) {
    return JwtService.decodeAuthHeader(req.get('Authorization')).user_id;
  },
};
