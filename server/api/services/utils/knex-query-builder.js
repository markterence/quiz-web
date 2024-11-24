/**
 * Use knex query builder to generate SQL strings instead of string concat.
 *
 * @example
 * const sql = knex('users')
 *    .leftJoin('user_profile', 'users.id', 'user_profile.user_iid')
 *    .where((builder) => {
 *      builder.whereNull('users.deleted_at');
 *      builder.where('users.id', '=', userId);
 *    })
 *    .select('user_profile.id as user_profile_id')
 *    .toQuery();
 */

const knex = require('knex')({ client: 'mysql2' });
module.exports = knex;
