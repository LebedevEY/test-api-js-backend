const bcrypt = require("bcrypt");
const logger = require("../../../services/logger.service")(module);
const { OK, UNAUTHORIZED } = require("../../../constants/http-codes");
const { Unauthorized } = require("../../../constants/errors");
const JwtService = require("../../../services/jwt.service/jwt.service");
const jwtConfig = require("../../../config").jwt;
const { sampleDB } = require("../../../services/database.service");

/**
 * POST /users/auth
 * Авторизация пользователя с помощью логина и пароля
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getAuth(req, res) {
  logger.init("user authentication");
  const { login, password } = req.body;

  try {
    const table = sampleDB.models.User;
    const user = await table.findOne({ where: { login } });

    if (!user) {
      throw new Unauthorized("Неверный логин");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Unauthorized("Неверный пароль");
    }

    const userData = {
      id: user.id,
      login: user.login,
      full_name: user.full_name
    };

    const token = new JwtService(jwtConfig).encode(userData).data;

    res.header("Authorization", `Bearer ${token}`);
    logger.success();
    return res.status(OK).json({
      user: userData,
      token
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(error.http_code || UNAUTHORIZED).json({
      error: error.error_code || "UNAUTHORIZED",
      message: error.message
    });
  }
}

module.exports = {
  getAuth,
};
