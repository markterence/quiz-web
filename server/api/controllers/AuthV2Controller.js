let _ = require('lodash')
let empty = require('is-empty')

let sailsDebug = sails.log.debug

/**
 * AuthV2Controller
 *
 */
module.exports = {
  /**
   * Desired 400 Response:
   * @example
   * {
   * 	"email": ["This field is required"],
   *  "password": ["This field is required"]
   * }
   *
   */
  login: (req, res) => {
    const { username, password } = req.body

    sailsDebug('AuthV2Ctrl: body:', req.body)

    LoginServiceAPIv2.passwordLogin({ username, password })
      .then(function(user) {
        if (empty(user)) {
          return res.status(400).json({
            email: ['Something went wrong.'],
          })
        } else {
          return res.status(200).json(user)
        }
      })
      .catch(function(error) {
        if (empty(error)) {
          return res.status(400).json({
            email: ['Something went wrong.'],
          })
        } else {
          return res.status(400).json(error.errors)
        }
      })
  },

  /**
   * This just decodes the token and poof either 401
   * or the decoded payload.
   */
  session: (req, res) => {
    const bearerToken = req.get('Authorization')
    const accessToken = JwtService.decodeAuthHeader(bearerToken)
    console.log(`Session:`, accessToken)

    const rawBearerToken = bearerToken.split(' ')[1]
    LoginServiceAPIv2.session(accessToken)
      .then(function(user) {
        return res.status(200).json({
          token: rawBearerToken,
          ...user,
        })
      })
      .catch(error => {
        return res.status(401).json({
          message: 'Invalid Token.',
          description: 'Session Failed',
        })
      })
  },
}
