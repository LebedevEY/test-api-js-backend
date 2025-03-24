const { Op } = require("sequelize");
const { sampleDB } = require("../../../../services/database.service");

/**
 * Возвращает список компаний с возможностью фильтрации, сортировки и пагинации.
 * @param {Object} options - Параметры запроса
 * @return {Object} - Результат с данными и метаинформацией о пагинации
 */
async function getMany(options = {}) {
  const filter = options.filter || {};
  const sort = options.sort || {};
  const page = options.page || 1;
  const limit = options.limit || 10;

  const offset = (page - 1) * limit;

  const where = {};

  if (filter.type) {
    if (Array.isArray(filter.type)) {
      where.type = {
        [Op.overlap]: filter.type
      };
    } else {
      where.type = {
        [Op.contains]: [filter.type]
      };
    }
  }

  const order = [];

  if (sort.name !== undefined) {
    order.push(["name", sort.name ? "ASC" : "DESC"]);
  }

  if (sort.createdAt !== undefined) {
    order.push(["createdAt", sort.createdAt ? "ASC" : "DESC"]);
  }

  try {
    const table = sampleDB.models.Company;
    if (!table) {
      return [];
    }
    
    return await table.findAll({
      where,
      order,
      limit,
      offset,
      include: [
        {
          model: sampleDB.models.Contact,
          as: "contact",
        },
      ],
      raw: true,
      nest: true,
    });
  } catch (error) {
    return new Error(error.errors ? error.errors[0].message : error);
  }
}

module.exports = { getMany };
