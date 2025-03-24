const logger = require("../../../services/logger.service")(module);
const { CREATED, BAD_REQUEST } = require("../../../constants/http-codes");
const companyMethods = require("../../../DB/sample-db/methods/company");

/**
 * POST /companies
 * Эндпоинт добавления данных компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function addOne(req, res) {
  logger.info("adding company");
  const data = req.body;
  const result = await companyMethods.createOne(data);
  if (result instanceof Error) {
    res.status(BAD_REQUEST).json(result.message);
    logger.error(result.message)
  } else {
    result.photos = result.photos || [];
    res.status(CREATED).json(result);
    logger.success()
  }
}

module.exports = {addOne}
