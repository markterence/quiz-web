/**
 * Questions.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
   attributes: {
    question: {
      type: 'string',
      columnType: 'text',
    },
    choiceA: {
      type: 'string',
      columnType: 'text',
    },
    choiceB: {
      type: 'string',
      columnType: 'text',
    },
    choiceC: {
      type: 'string',
      columnType: 'text',
    },
   },
   tableName: 'questions'
}
