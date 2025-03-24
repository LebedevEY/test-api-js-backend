const { check } = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");

const getAuth = [
  check("login")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "login: parameter is required",
    }),
  check("password")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "password: parameter is required",
    }),
  validate,
];

module.exports = { getAuth };
