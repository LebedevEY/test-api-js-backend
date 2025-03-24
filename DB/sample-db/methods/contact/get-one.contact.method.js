const { sampleDB } = require("../../../../services/database.service");

/**
 * Возвращает данные контакта с указанным идентификатором.
 * @param {string} id
 * @return {Object|null}
 */
async function getOne(id) {
  const table = sampleDB.models.Contact
  try {
    return await table.findOne({where: {id}}, {raw: true})
  } catch (error) {
    return error;
  }
  // const mock = {
  //   id: 16,
  //   lastname: "Григорьев",
  //   firstname: "Сергей",
  //   patronymic: "Петрович",
  //   phone: "79162165588",
  //   email: "grigoriev@funeral.com",
  //   createdAt: "2020-11-21T08:03:26.589Z",
  //   updatedAt: "2020-11-23T09:30:00Z",
  // };
  //
  // return parseInt(id, 10) === mock.id ? mock : null;
}

module.exports = { getOne };
