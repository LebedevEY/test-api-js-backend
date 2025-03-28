const { sampleDB } = require("../../../../services/database.service");

/**
 * Редактирует данные компании с указанным идентификатором
 * и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Object}
 */
async function editOne(id, data) {
  try {
    const table = sampleDB.models.Company;
    if (!table) {
      return null;
    }
    
    return await table.update({...data}, {where: {id}});
  } catch (error) {
    return new Error(error.errors ? error.errors[0].message : error);
  }
}

module.exports = { editOne };
