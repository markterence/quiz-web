module.exports = async function findOne(req, res) {
  try {
    let result = await Questions.findOne(req.params);

    return res.json(result);
  } catch (error) {
    sails.log.error(error);
    return res.serverError();
  }
};
