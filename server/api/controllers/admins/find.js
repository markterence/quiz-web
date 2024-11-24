module.exports = async function find(req, res) {
  try {
    let result = await Admins.find(
      req.query.where ? JSON.parse(req.query.where) : req.query,
    );

    return res.json(result);
  } catch (error) {
    sails.log.error(error);
    return res.serverError();
  }
};
