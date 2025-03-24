const { sampleDB } = require("../../../../services/database.service");

/**
 * Создает новую компанию и возвращает результат.
 * @param {Object} data
 * @return {Object}
 */
async function createOne(data) {
  try {
    const table = sampleDB.models.Company;
    if (!table) {
      return null;
    }
    
    return await table.create(data);
  } catch (error) {
    return new Error(error.errors ? error.errors[0].message : error);
  }
}

module.exports = { createOne };
