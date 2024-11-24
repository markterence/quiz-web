
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('takers', function(t) {
      t.increments('id').primary()
      t.string('name', 100)
      t.datetime('created_at')
      t.datetime('updated_at')
      t.datetime('deleted_at')
    })
    .then(() => {})
}

exports.down = function(knex, Promise) {
  // return knex.schema.dropTableIfExists('takers').then(() => {})
}
exports.config = { transaction: false }
