/**
 * This migration file is for the built in users entity.
 */
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function(t) {
      t.increments('id').primary()
      t.string('username')
      t.string('email')
      t.string('password')
      t.string('name')
      t.boolean('isEmailVerified')
      t.text('avatar', 'longtext')
      t.datetime('created_at')
      t.datetime('updated_at')
      t.datetime('deleted_at')
    })
    .then(() => {})
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users').then(() => {})
}
exports.config = { transaction: false }
