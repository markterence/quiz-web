const HTTP_STATUS = require('http-status')
const empty = require('is-empty')
const moment = require('moment')
const _ = require('lodash')

const UNIQ_EMAIL = 'This email is already taken.'
const UNIQ_USER = 'This username is already taken.'
const REQUIRED_FIELD = 'This field is required'

const USERNAME_MAX = 30
const LONG_USERNAME = `Your username cannot be longer than ${USERNAME_MAX} characters`
const USERNAME_TOO_SHORT = `Username is too short.`
const USERNAME_FORMAT =
  'Usernames can contain characters a-z, 0-9, underscores and periods. The username cannot start with a period nor end with a period.'
const USERNAME_REGEX = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim

/**
 * Remember to omit 'password' field and other sensitive fields.
 */
module.exports = {
  destroy: async function(req, res) {
    if (empty(req.params.id)) {
      return res
        .status(400)
        .json({ code: 'NOT_ALLOWED', message: 'Not Allowed' })
    } else {
      let criteria = {
        id: req.params.id,
      }
      const unixMS = moment.now()
      try {
        await Users.update(criteria, {
          deleted_at: moment(unixMS).toISOString(),
        }).fetch()
        return res.json({
          code: 'SOFT_DELETE',
          message: '',
        })
      } catch (error) {
        return res.negotiate(error)
      }
    }
  },

  update: async function(req, res) {
    try {
      const valuesToUpdate = _.omit(req.body, ['id'])
      let updateResult = await Users.updateOne({
        id: req.params.id,
      }).set(valuesToUpdate)
      const safeUser = _.omit(updateResult, ['password'])
      return res.json(safeUser)
    } catch (error) {
      return res.negotiate(error)
    }
  },

  findOne: async function(req, res) {
    try {
      let user = await Users.findOne(req.params)
      const safeUser = _.omit(user, ['password'])
      return res.json(safeUser)
    } catch (error) {
      return res.negotiate(error)
    }
  },

  find: async function(req, res) {
    try {
      let users = await Users.find(
        req.query.where ? JSON.parse(req.query.where) : req.query
      )
      const safeUser = _.map(users, function(user) {
        return _.omit(user, ['password'])
      })
      return res.json(safeUser)
    } catch (error) {
      return res.negotiate(error)
    }
  },

  create: async function(req, res) {
    let valuesToSet = req.body
    let validationErrors = {
      email: [],
      password: [],
      username: [],
    }

    if (empty(valuesToSet.username)) {
      // empty username
      validationErrors.username.push(REQUIRED_FIELD)
    } else if (valuesToSet.username.length < 2) {
      // short username
      validationErrors.username.push(USERNAME_TOO_SHORT)
    } else if (valuesToSet.username.length > USERNAME_MAX) {
      // username greater than 30
      validationErrors.username.push(LONG_USERNAME)
    } else if (!USERNAME_REGEX.test(valuesToSet.username)) {
      // username format is invalid
      validationErrors.username.push(USERNAME_FORMAT)
    }

    if (empty(valuesToSet.password)) {
      validationErrors.password.push(REQUIRED_FIELD)
    }

    if (empty(valuesToSet.email)) {
      validationErrors.email.push(REQUIRED_FIELD)
    }

    // Checkpoint for validation errors.
    if (
      validationErrors.email.length > 0 ||
      validationErrors.password.length > 0 ||
      validationErrors.username.length > 0
    ) {
      // removed fields that don't have error
      const cleanvalidationError = _.omitBy(validationErrors, function(k, i) {
        return validationErrors[i].length === 0
      })
      return res.status(400).json(cleanvalidationError)
    } else {
      try {
        let createdUser = await Users.create(req.body).fetch()
        const safeUser = _.omit(createdUser, ['password'])
        return res.status(201).json(safeUser)
      } catch (error) {
        console.log(error)
        return res.negotiate(error)
      }
    }
  },
}
