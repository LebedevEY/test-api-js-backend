const logger = require("../../../services/logger.service")(module);
const { OK, BAD_REQUEST } = require("../../../constants/http-codes");
const companyMethods = require("../../../DB/sample-db/methods/company");
const { NotFound } = require("../../../constants/errors");

/**
 * PATCH /companies/:id
 * Эндпоинт редактирования данных компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function editOne(req, res) {
  logger.info("edit company");
  const { id } = req.params;
  const data = req.body;

  const company = companyMethods.getOne(id);
  if (!company) {
    throw new NotFound("Company not found");
  }

  const result = await companyMethods.editOne(id, data);
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
