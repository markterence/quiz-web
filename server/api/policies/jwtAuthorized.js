module.exports = (req, res, next) => {
  const token = req.get('Authorization');
  const isTokenValid = JwtService.decodeAuthHeader(token);
  const unauthData = { code: 'TOKEN_INVALID', message: 'Invalid Token' };

  return isTokenValid ? next() : res.status(401).json(unauthData);
};
