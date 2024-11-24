let empty = require('is-empty')
let _ = require('lodash')

const EMAIL_NOT_FOUND = 'Email does not exist.'
const PASSWORD_MISMATCH = 'Password does not match.'
const REQUIRED_FIELD = 'This field is required'
const EMAIL_VERIFICATION_REQUIRED = 'Email is not yet verified.'
const VERIFY_EMAIL = false

/**
 * LoginServiceAPIv2
 *
 * Desired 401 Response:
 * @example
 * {
 * 	"email": ["This field is required"],
 *  "password": ["This field is required"]
 * }
 */

module.exports = {
  passwordLogin: function({ username, password }) {
    return new Promise((resolve, reject) => {
      let _errors = []
      let emailErrs = []
      let passwordErrs = []
      if (empty(username)) {
        emailErrs.push(REQUIRED_FIELD)
      }
      if (empty(password)) {
        passwordErrs.push(REQUIRED_FIELD)
      }

      if (emailErrs.length > 0 || passwordErrs.length > 0) {
        reject({
          errors: {
            email: emailErrs.length > 0 ? emailErrs : undefined,
            password: passwordErrs.length > 0 ? passwordErrs : undefined,
          },
        })
      } else {
        Users.findOne({
          or: [{ username: username }, { email: username }],
        })
          .then(function(user) {
            if (empty(user)) {
              reject({
                errors: {
                  email: [EMAIL_NOT_FOUND],
                },
              })
            } else {
              // Compare the password
              Users.comparePassword(password, user).then(isPasswdValid => {
                if (!isPasswdValid) {
                  return reject({
                    errors: {
                      password: [PASSWORD_MISMATCH],
                    },
                  })
                } else {
                  if (!VERIFY_EMAIL || user.isEmailConfirmed) {
                    let payload = {
                      user_id: user.id,
                      username: user.username,
                    }
                    // Set a random dummy avatar
                    if (empty(user.avatar)) {
                      user.avatar = `https://picsum.photos/64?random`
                    }

                    const safeUser = _.omit(_.cloneDeep(user), [
                      'password',
                      'is_deleted',
                      'createdAt',
                      'updatedAt',
                      'created_at',
                      'updated_at',
                    ])
                    return resolve({
                      token: JwtService.createToken(payload),
                      ...safeUser,
                    })
                  } else {
                    return reject({
                      errors: {
                        email: [EMAIL_VERIFICATION_REQUIRED],
                      },
                    })
                  }
                }
              })
            }
          })
          .catch(function(error) {
            sails.log.error('LoginV2', error)
            reject(null)
          })
      }
    })
  },

  session: function(accessToken) {
    return new Promise((resolve, reject) => {
      Users.findOne({
        username: accessToken.username,
        id: accessToken.user_id,
      })
        .then(function(user) {
          if (empty(user)) {
            reject(null)
          } else {
            if (empty(user.avatar)) {
              user.avatar = `https://picsum.photos/64?random`
            }
            const safeUser = _.omit(_.cloneDeep(user), [
              'password',
              'is_deleted',
              'createdAt',
              'updatedAt',
              'created_at',
              'updated_at',
            ])
            resolve(safeUser)
          }
        })
        .catch(function(error) {
          sails.log.error('LoginV2:Session', error)
          reject(null)
        })
    })
  },
}
