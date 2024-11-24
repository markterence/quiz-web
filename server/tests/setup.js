require('dotenv').config();
var sails = require('sails');
global.expect = require('expect')
require('jest-extended')
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

before(function (done) {
  this.timeout(65000);
  sails.lift({
    hooks: { grunt: false },
    log: { level: 'warn' },
    models: {
      migrate: 'drop',
      datastore: 'testDataStore'
    },
    port: 3000,
    datastores: {
      testDataStore: {
        adapter: 'sails-mysql',
        host: process.env.MYSQL_TEST_DB_HOST || '127.0.0.1',
        port: process.env.MYSQL_TEST_DB_PORT || 3306,
        user: process.env.MYSQL_TEST_DB_USER || 'root',
        password: process.env.MYSQL_TEST_DB_PASSWORD || '',
        database: process.env.MYSQL_TEST_DB_DATABASE || '',
      },
    }
  }, async function (err) {
    if (err) { return done(err); }
    await Users.create({
      username: 'user',
      password: 'password1123',
      email: 'qwaedaszxfzdsdgf1123@gmail.com'
    })

    return done()
  });
});

after(function (done) {
  sails.lower(done);
});
