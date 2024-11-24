exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('ip_filemeta', function(t) {
      t.increments('id').primary()

      t.text('filename')
      t.text('file_uuid')
      t.bigint('size')
      t.string('type')
      t.text('fd', 'longtext')

      t.datetime('created_at')
      t.datetime('updated_at')
      t.datetime('deleted_at')
    })
    .then(() => {})
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ip_filemeta').then(() => {})
}
