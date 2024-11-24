
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('questions', function(t) {
      t.increments('id').primary()
      t.text('question')
      t.text('choiceA')
      t.text('choiceB')
      t.text('choiceC')
      t.datetime('created_at')
      t.datetime('updated_at')
      t.datetime('deleted_at')
    })
    .then(() => {})
}

exports.down = function(knex, Promise) {
  // return knex.schema.dropTableIfExists('questions').then(() => {})
}
exports.config = { transaction: false }
