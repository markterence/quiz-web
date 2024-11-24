/**
 * Admins.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
   attributes: {
    name: {
      type: 'string',
      columnType: 'varchar(100)',
    },
    email: {
      type: 'string',
      columnType: 'varchar(255)',
    },
    password: {
      type: 'string',
      columnType: 'varchar(255)',
    },
   },
   tableName: 'admins'
}
