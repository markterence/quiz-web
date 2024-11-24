/**
 * When a valid token is detected, assign the decoded token on `req.user` object.
 * Now every controller action has access to `req.user`
 */

 module.exports = (req, res, next) => {
  const unauthData = { code: 'USER_UNAUTHORIZED', message: 'Unauthorized' };
  const userId = AuthService.getUserID(req);
  req.user = userId;
  return userId ? next() : res.status(401).json(unauthData);
};
