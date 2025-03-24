const logger = require("../../../services/logger.service")(module);
const { OK, BAD_REQUEST } = require("../../../constants/http-codes");
const contactMethods = require("../../../DB/sample-db/methods/contact");
const { NotFound } = require("../../../constants/errors");

/**
 * PATCH /contacts/:id
 * Эндпоинт редактирования данных контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function editOne(req, res) {
  logger.info("edit contact");
  const { id } = req.params;
  const data = req.body;

  const contact = contactMethods.getOne(id);
  if (!contact) {
    throw new NotFound("Contact not found");
  }

  const result = await contactMethods.editOne(id, data);
  if (result instanceof Error) {
    res.status(BAD_REQUEST).json(result.message);
    logger.error(result.message);
  } else {
    res.status(OK).json(result);
    logger.success();
  }
}

module.exports = {
  editOne,
};
