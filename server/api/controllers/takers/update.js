const _ = require('lodash');

module.exports = async function update(req, res) {
  try {
    const valuesToUpdate = _.omit(req.body, ['id', 'created_at', 'updated_at']);

    let updateResult = await Takers.updateOne({
      id: req.params.id,
    }).set(valuesToUpdate);

    return res.json(updateResult);
  } catch (error) {
    sails.log.error(error);
    return res.serverError();
  }
};
