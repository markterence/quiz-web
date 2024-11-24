/**
 * Answers.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
   attributes: {
    taker_id: {
      type: 'number',
      columnType: 'int(11)',
    },
    question_id: {
      type: 'number',
      columnType: 'int(11)',
    },
    answer: {
      type: 'ref',
      columnType: 'enum('a','b','c')',
    },
   },
   tableName: 'answers'
}
