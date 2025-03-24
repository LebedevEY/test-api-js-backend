const { Sequelize } = require("sequelize");
const dbsConfig = require("../config").dbs;
const logger = require("./logger.service")(module);
require("dotenv").config();

/**
 * Базовый класс сервиса работы с базой данных
 */
class Database {
  #dialect;

  #charset;

  #username;

  #password;

  #host;

  #port;

  #database;

  #timezone;

  #connection;

  #models;

  constructor(config) {
    this.#dialect = config.dialect;
    this.#charset = config.charset;
    this.#username = config.username;
    this.#password = config.password;
    this.#host = config.host;
    this.#port = config.port;
    this.#database = config.database;
    this.#timezone = config.timezone;
  }

  /**
   * Открывает соединение с БД.
   * @return {Promise<void>}
   */
  async connect() {
    try {
      const sequelize = new Sequelize({
        dialect: this.#dialect,
        charset: this.#charset,
        username: this.#username,
        password: this.#password,
        host: this.#host,
        port: this.#port,
        database: this.#database,
        timezone: this.#timezone,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        }
      });

      await sequelize.authenticate();
      this.#connection = sequelize;
      this.#models = require("../DB/sample-db/models/index")();
      await sequelize.sync({alter: true});
      logger.info(`Connected to DB and synced models.`);
    } catch (error) {
      logger.error(`Unable to connect to DB:`, error.message);
      throw error;
    }
  }

  /**
   * Закрывает соединение с БД.
   * @return {Promise<void>}
   */
  async disconnect() {
    if (this.#connection) {
      try {
        await this.#connection.close();
        logger.info(`Disconnected from DB`);
      } catch (error) {
        logger.error(`Unable to disconnect from DB:`, error.message);
      }
    }
  }

  /**
   * Возвращает объект соединения с БД,
   * @return {Object}
   */
  get connection() {
    return this.#connection;
  }

  /**
   * Возвращает модели таблиц БД,
   * @return {Object}
   */
  get models() {
    return this.#models;
  }
}

const sampleDB = new Database(dbsConfig.sample_db);

module.exports = { sampleDB };
