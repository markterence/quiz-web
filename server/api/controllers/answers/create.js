module.exports = async function create(req, res) {
  let valuesToSet = req.body;

  try {
    let createdRecord = await Answers.create(valuesToSet).fetch();

    return res.status(201).json(createdRecord);
  } catch (error) {
    sails.log.error(error);
    return res.serverError();
  }
};
