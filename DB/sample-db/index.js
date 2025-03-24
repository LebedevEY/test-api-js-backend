const { sampleDB } = require("../../services/database.service");

function connectionFactory() {
  const { connection } = sampleDB;

  return connection;
}

module.exports = connectionFactory;
