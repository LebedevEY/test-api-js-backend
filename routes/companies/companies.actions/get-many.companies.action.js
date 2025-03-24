const logger = require("../../../services/logger.service")(module);
const { OK, BAD_REQUEST } = require("../../../constants/http-codes");
const companyMethods = require("../../../DB/sample-db/methods/company");
const { getUrlForRequest } = require("../../../helpers/url.helper");
const { parseOne } = require("../companies.service");

/**
 * GET /companies
 * Эндпоинт получения списка компаний с фильтрацией, сортировкой и пагинацией.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getMany(req, res) {
  logger.init("get companies list");

  const filter = {};
  const {status, type, sortByName, sortByCreatedAt, page, limit} = req.query;
  if (status) {
    filter.status = status;
  }

  if (type) {
    filter.type = type;
  }

  const sort = {};
  if (sortByName !== undefined) {
    sort.name = sortByName === "true";
  }

  if (sortByCreatedAt !== undefined) {
    sort.createdAt = sortByCreatedAt === "true";
  }

  const pagination = {};
  if (page) {
    pagination.page = parseInt(page, 10);
  }

  if (limit) {
    pagination.limit = parseInt(limit, 10);
  }

  const result = await companyMethods.getMany({
    filter,
    sort,
    pagination
  });

  const photoUrl = getUrlForRequest(req);

  if (result instanceof Error) {
    res.status(BAD_REQUEST).json(result.message);
    logger.error(result.message);
  } else {
    const parsedData = result.map(company => {
      company.photos = company.photos || [];
      return parseOne(company, photoUrl);
    });
    
    res.status(OK).json(parsedData);
    logger.success();
  }
}

module.exports = {
  getMany,
};
