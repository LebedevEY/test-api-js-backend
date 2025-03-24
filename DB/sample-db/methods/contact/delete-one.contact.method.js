const { sampleDB } = require("../../../../services/database.service");

/**
 * Удаляет контакт.
 * @param {string} id
 * @return {Promise<Object>}
 */
async function deleteOne(id) {
  const table = sampleDB.models.Contact
  try {
    return await table.destroy({ where: { id } });
  } catch (error) {
    return new Error(error.errors ? error.errors[0].message : error);
  }
}

module.exports = { deleteOne }
