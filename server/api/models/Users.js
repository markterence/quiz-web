/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const empty = require('is-empty')
// const BcryptService = require('../services/BcryptService')
module.exports = {
  attributes: {
    // ============
    // Primitives
    // ============
    username: {
      type: 'string',
      minLength: 2,
      required: true,
      unique: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true,
    },
    name: {
      type: 'string',
    },
    isEmailVerified: {
      type: 'boolean',
      defaultsTo: false,
    },
    avatar: {
      type: 'string',
    },

    // ============
    //  Embeds
    // ============

    //  ============
    //  Associations/Relationships
    //  ============
  },
  migrate: 'safe',
  tableName: 'users',
  comparePassword: function(plainPassword, user) {
    return new Promise((resolve, reject) => {
      BcryptService.compare(plainPassword, user.password)
        .then(matched => {
          return resolve(matched)
        })
        .catch(error => {
          return reject(error)
        })
    })
  },
  beforeCreate: function(valuesToSet, proceed) {
    // Use username when `name` field is blank.
    if (empty(valuesToSet.name)) {
      valuesToSet.name = valuesToSet.username
    }
    if (empty(valuesToSet.avatar)) {
      valuesToSet.avatar = `https://picsum.photos/64?random`
    }
    // Hash the password before saving.
    BcryptService.hash(valuesToSet.password)
      .then(function(hashedPassword) {
        valuesToSet.password = hashedPassword
        return proceed()
      })
      .catch(function(err) {
        return proceed(err)
      })
  },

  afterCreate: function(newlyCreatedRecord, proceed) {
    proceed()
  },
  beforeUpdate: function(valueToSet, next) {
    if (valueToSet.password) {
      BcryptService.hash(valueToSet.password)
        .then(hashedPassword => {
          valueToSet.password = hashedPassword
          next()
        })
        .catch(err => {
          if (err) next(err)
        })
    } else {
      next()
    }
  },
}
