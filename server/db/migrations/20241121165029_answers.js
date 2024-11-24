
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('answers', function(t) {
      t.increments('id').primary()
      t.specificType('taker_id', 'int(11)')
      t.specificType('question_id', 'int(11)')
      t.specificType('answer', 'enum('a','b','c')')
      t.datetime('created_at')
      t.datetime('updated_at')
      t.datetime('deleted_at')
    })
    .then(() => {})
}

exports.down = function(knex, Promise) {
  // return knex.schema.dropTableIfExists('answers').then(() => {})
}
exports.config = { transaction: false }
