
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('admins', function(t) {
      t.increments('id').primary()
      t.string('name', 100)
      t.string('email', 255)
      t.string('password', 255)
      t.datetime('created_at')
      t.datetime('updated_at')
      t.datetime('deleted_at')
    })
    .then(() => {})
}

exports.down = function(knex, Promise) {
  // return knex.schema.dropTableIfExists('admins').then(() => {})
}
exports.config = { transaction: false }
