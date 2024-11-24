const empty = require('is-empty');

module.exports = async function destroy(req, res) {
  if (empty(req.params.id)) {
    return res
      .status(400)
      .json({ code: 'NOT_ALLOWED', message: 'Not Allowed' });
  }

  let criteria = {
    id: req.params.id,
  };

  try {
    await Takers.softDelete(criteria);

    return res.json({
      code: 'SOFT_DELETE',
      message: '',
    });
  } catch (error) {
    sails.log.error(error);
    return res.serverError();
  }
};
