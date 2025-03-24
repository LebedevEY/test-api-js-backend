const { sampleDB } = require("../../../../services/database.service");

/**
 * Создает новый контакт и возвращает результат.
 * @param {Object} data
 * @return {Object}
 */
async function createOne(data) {
  const table = sampleDB.models.Contact
  try {
    return await table.create(data)
  } catch (error) {
    return new Error(error.errors ? error.errors[0].message : error);
  }
}

module.exports = { createOne };
