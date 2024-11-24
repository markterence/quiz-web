const moment = require('moment');
const _ = require('lodash');

const BcryptService = require('../../api/services/BcryptService');
const { MYSQL_DATETIME_FORMAT } = require('../../api/services/utils/datetime');

const USERS = require('../data/Users.json');
const dateNow = moment.now();

exports.seed = async function(knex) {
 let res = await Promise.all(
   _.map(USERS, async(user) => {

    user['created_at'] = moment(dateNow).format(MYSQL_DATETIME_FORMAT);
    user['updated_at'] = moment(dateNow).format(MYSQL_DATETIME_FORMAT);
    user['password'] = await BcryptService.hash(user.password);

    return user;
  })
 );

 return knex('users').select()
  .whereIn('id', [1,2,3])
  .then(function(rows){
    if(rows.length === 0) {
      return knex('users').insert(res);
    }
  })
};
