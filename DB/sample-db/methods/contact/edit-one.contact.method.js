const { sampleDB } = require("../../../../services/database.service");

/**
 * Редактирует данные контакта с указанным идентификатором
 * и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Promise<Object>}
 */
async function editOne(id, data) {
  const table = sampleDB.models.Contact
  try {
    return await table.update({...data}, {where: {id}});
  } catch (error) {
    return new Error(error.errors ? error.errors[0].message : error);
  }
}

module.exports = { editOne };
