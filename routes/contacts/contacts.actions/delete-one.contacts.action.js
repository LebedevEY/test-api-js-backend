const logger = require("../../../services/logger.service")(module);
const { OK, BAD_REQUEST } = require("../../../constants/http-codes");
const contactMethods = require("../../../DB/sample-db/methods/contact");
const { NotFound } = require("../../../constants/errors");

/**
 * DELETE /contacts/:id
 * Эндпоинт удаления контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function deleteOne(req, res) {
  logger.info("deleting contact");
  const { id } = req.params;
  const contact = contactMethods.getOne(id);
  if (!contact) {
    throw new NotFound("Contact not found");
  }
  const result = await contactMethods.deleteOne(id);
  if (result instanceof Error) {
    res.status(BAD_REQUEST).json(result.message);
    logger.error(result.message);
  } else {
    res.status(OK).json(result);
    logger.success();
  }
}
module.exports = { deleteOne };
