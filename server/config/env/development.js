module.exports = {
  port: process.env.APP_PORT || 1337,
  models: {
    migrate: 'safe',
    datastore: process.env.SAILS_DATASTORE || 'mysqldb'
  }
}
