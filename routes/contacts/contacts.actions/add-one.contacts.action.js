const logger = require("../../../services/logger.service")(module);
const { OK, BAD_REQUEST } = require("../../../constants/http-codes");
const contactMethods = require("../../../DB/sample-db/methods/contact");

/**
 * POST /contacts
 * Эндпоинт добавления контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function addOne(req, res) {
  logger.info("adding contact");
  const data = req.body;
  const result = await contactMethods.createOne(data)
  if (result instanceof Error) {
    res.status(BAD_REQUEST).json(result.message);
    logger.error(result.message)
  } else {
    res.status(OK).json(result);
    logger.success()
  }
}

module.exports = { addOne };
