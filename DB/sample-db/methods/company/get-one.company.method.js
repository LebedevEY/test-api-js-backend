const { sampleDB } = require("../../../../services/database.service");

/**
 * Возвращает данные компании с указанным идентификатором.
 * @param {string} id
 * @return {Object|null}
 */
async function getOne(id) {
  try {
    const table = sampleDB.models.Company;
    if (!table) {
      return null;
    }
    
    return await table.findOne({
      raw: true,
      nest: true,
      include: [
        {
          model: sampleDB.models.Contact,
          as: "contact"
        }
      ],
      where: {id}
    });
  } catch (error) {
    return new Error(error.errors ? error.errors[0].message : error);
  }
}

module.exports = { getOne };
